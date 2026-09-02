const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

function wrapLines(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function renderFortuneCard(message, { legendary = false } = {}) {
  if (typeof document.fonts !== "undefined") {
    await document.fonts.ready;
  }

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createRadialGradient(
    CARD_WIDTH / 2, CARD_HEIGHT * 0.16, 0,
    CARD_WIDTH / 2, CARD_HEIGHT * 0.16, CARD_HEIGHT
  );
  bg.addColorStop(0, "#17102b");
  bg.addColorStop(0.62, "#08070d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.strokeStyle = legendary ? "#fff8e2" : "rgba(228,214,167,0.4)";
  ctx.lineWidth = legendary ? 4 : 2;
  ctx.strokeRect(56, 56, CARD_WIDTH - 112, CARD_HEIGHT - 112);

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(228,214,167,0.75)";
  ctx.font = "40px Fraunces, serif";
  ctx.fillText("✦ ☾ ♆ ✧", CARD_WIDTH / 2, 200);

  if (legendary) {
    ctx.fillStyle = "#fff8e2";
    ctx.font = "600 24px Manrope, sans-serif";
    ctx.fillText("· PRESAGIO LEGENDARIO ·", CARD_WIDTH / 2, 258);
  }

  ctx.fillStyle = legendary ? "#fff8e2" : "#e4d6a7";
  ctx.font = "italic 400 52px 'Fraunces', serif";
  const lines = wrapLines(ctx, message, CARD_WIDTH - 260);
  const lineHeight = 70;
  const startY = CARD_HEIGHT / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line, CARD_WIDTH / 2, startY + i * lineHeight));

  ctx.fillStyle = "rgba(221,212,195,0.55)";
  ctx.font = "600 24px Manrope, sans-serif";
  ctx.fillText("PORTAL MÍSTICO", CARD_WIDTH / 2, CARD_HEIGHT - 140);
  ctx.fillStyle = "rgba(221,212,195,0.4)";
  ctx.font = "400 20px Manrope, sans-serif";
  ctx.fillText("Yuthramys · Portafolio", CARD_WIDTH / 2, CARD_HEIGHT - 102);

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

export async function shareFortuneImage(message, { legendary = false } = {}) {
  const blob = await renderFortuneCard(message, { legendary });
  if (!blob) return;

  const file = new File([blob], "portal-mistico.png", { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "Portal Místico", text: message });
      return;
    } catch {
      // El usuario canceló o falló el share nativo; se ofrece la descarga como respaldo.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "portal-mistico.png";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
