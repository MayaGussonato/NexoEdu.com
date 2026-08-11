import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { registrarEntrada } from "../../services/api";

function ScannerPanel({ onBack }) {
  const scannerRef = useRef(null);
  const processandoRef = useRef(false);
  const audioOk = useRef(null);
  const timeoutRef = useRef(null);

  const [status, setStatus] = useState("Preparando câmera...");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState("");
  const [aluno, setAluno] = useState(null);

  const [modoManual, setModoManual] = useState(false);
  const [raDigitado, setRaDigitado] = useState("");
  const [enviandoManual, setEnviandoManual] = useState(false);

  useEffect(() => {
    audioOk.current = new Audio("/success.mp3");

    if (!modoManual) {
      iniciarScanner();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      pararCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoManual]);

  async function pararCamera() {
    if (scannerRef.current?.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch {
        // já parado, ignora
      }
    }
  }

  async function obterScanner() {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
    }
    return scannerRef.current;
  }

  async function iniciarScanner() {
    try {
      setErro("");
      setAluno(null);
      setResultado("");
      processandoRef.current = false;
      setStatus("Preparando câmera...");

      await pararCamera();

      await new Promise((resolve) => setTimeout(resolve, 300));

      const scanner = await obterScanner();

      const cameras = await Html5Qrcode.getCameras();

      if (!cameras.length) {
        throw new Error("Nenhuma câmera encontrada.");
      }

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
         qrbox: {
  width: 250,
  height: 250,
},
        },
        async (decodedText) => {
          if (processandoRef.current) return;
          processandoRef.current = true;

          try {
            await pararCamera();

            const ra = decodedText.replace(/-/g, "").replace(/\s/g, "").toUpperCase();
            await processarCheckIn(ra);
          } catch (err) {
            setAluno(null);
            setErro(err.message || "Erro ao registrar entrada.");
            setStatus("");

            timeoutRef.current = setTimeout(() => {
              iniciarScanner();
            }, 5000);
          }
        },
        () => {}
      );

      setStatus("Câmera pronta. Aponte para o QR Code.");
    } catch (Erro) {
      setErro("Não foi possível acessar a câmera.");
      setStatus("");

      timeoutRef.current = setTimeout(() => {
        iniciarScanner();
      }, 3000);
    }
  }

  async function processarCheckIn(ra) {
    setResultado(ra);
    setStatus("Obtendo sua localização...");

    const posicao = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Seu navegador não suporta geolocalização."));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

    setStatus("Registrando entrada...");

    const dados = await registrarEntrada(
      ra,
      posicao.coords.latitude,
      posicao.coords.longitude
    );

    setAluno(dados);
    setStatus("Entrada registrada!");
    audioOk.current?.play().catch(() => {});

    timeoutRef.current = setTimeout(() => {
      setModoManual(false);
      setRaDigitado("");
      iniciarScanner();
    }, 5000);
  }

  async function abrirModoManual() {
    await pararCamera();
    clearTimeout(timeoutRef.current);
    setErro("");
    setAluno(null);
    setResultado("");
    setRaDigitado("");
    setModoManual(true);
  }

  function fecharModoManual() {
    setModoManual(false);
    setRaDigitado("");
    setErro("");
  }

  function adicionarDigito(digito) {
    if (raDigitado.length >= 20) return;
    setRaDigitado((atual) => atual + digito);
  }

  function apagarDigito() {
    setRaDigitado((atual) => atual.slice(0, -1));
  }

  async function enviarRegistroManual() {
    if (!raDigitado.trim() || enviandoManual) return;

    setEnviandoManual(true);
    setErro("");

    try {
      await processarCheckIn(raDigitado.trim().toUpperCase());
    } catch (err) {
      setAluno(null);
      setErro(err.message || "Erro ao registrar entrada.");
      setStatus("");

      timeoutRef.current = setTimeout(() => {
        setModoManual(false);
        setRaDigitado("");
        iniciarScanner();
      }, 5000);
    } finally {
      setEnviandoManual(false);
    }
  }

  return (
    <section className="panel-view scanner-panel">
      <button className="panel-back" onClick={onBack} type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Voltar
      </button>

      <span className="cards-eyebrow">Check-in diário</span>
      <h2 className="login-title">
        {modoManual ? "Digite seu RA" : "Escaneie o QR Code"}
      </h2>
      <p className="login-subtitle">
        {modoManual
          ? "Esqueceu o crachá? Digite seu RA para fazer o check-in."
          : "Posicione o crachá dentro da área destacada."}
      </p>

      {!modoManual && !aluno && !erro && (
        <>
          <div className="camera-wrapper">
            <div id="qr-reader"></div>
          </div>
          <div className="scanner-status">
            <span className="status-dot"></span>
            {status}
          </div>
          <button className="ra-manual-link" onClick={abrirModoManual} type="button">
            Digitar RA
          </button>
        </>
      )}

      {modoManual && !aluno && !erro && (
        <div className="ra-manual-panel">
          <div className="ra-manual-display">
            {raDigitado || <span className="ra-manual-placeholder">Digite o RA</span>}
          </div>

          <div className="ra-manual-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
              <button key={n} type="button" onClick={() => adicionarDigito(n)}>
                {n}
              </button>
            ))}
            <button type="button" onClick={apagarDigito} className="ra-manual-apagar">
              ⌫
            </button>
            <button type="button" onClick={() => adicionarDigito("0")}>
              0
            </button>
            <button type="button" onClick={() => adicionarDigito("SP")} className="ra-manual-sp">
              SP
            </button>
          </div>

          <button
            className="ra-manual-enviar"
            type="button"
            disabled={!raDigitado.trim() || enviandoManual}
            onClick={enviarRegistroManual}
          >
            {enviandoManual ? "Enviando..." : "Enviar registro"}
          </button>

          <button className="ra-manual-voltar" onClick={fecharModoManual} type="button">
            Voltar para o scanner
          </button>
        </div>
      )}

      {aluno && (
        <div className="scanner-result">
          <h3>Entrada registrada</h3>
          <div className="result-grid">
            <div>
              <span>Nome</span>
              <strong>{aluno.aluno}</strong>
            </div>
            <div>
              <span>RA</span>
              <strong>{aluno.ra}</strong>
            </div>
            <div>
              <span>Turma</span>
              <strong>{aluno.turma}</strong>
            </div>
            <div>
              <span>Data</span>
              <strong>{aluno.data}</strong>
            </div>
            <div>
              <span>Horário</span>
              <strong>{aluno.horario}</strong>
            </div>
            <div>
              <span>Situação</span>
              <strong className={aluno.situacao === "ATRASADO" ? "texto-vermelho" : "texto-verde"}>
                {aluno.situacao}
              </strong>
            </div>
          </div>
          <p className="scanner-hint">Voltando ao scanner em instantes...</p>
        </div>
      )}

      {erro && (
        <div className="scanner-result">
          <h3>Não foi possível registrar</h3>
          <p>{erro}</p>
          {resultado && <p className="scanner-hint">RA informado: {resultado}</p>}
          <p className="scanner-hint">Tentando novamente em instantes...</p>
        </div>
      )}
    </section>
  );
}

export default ScannerPanel;