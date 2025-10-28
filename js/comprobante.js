 document.getElementById("btnImprimir").addEventListener("click", () => {
      const contenido = document.getElementById("resumenPDF").innerHTML;
      const ventana = window.open("", "PRINT", "height=600,width=800");
      ventana.document.write(`
        <html>
          <head>
            <title>Comprobante CineAura</title>
            <style>
              body { font-family: 'Lexend', sans-serif; padding: 20px; }
              h2 { text-align: center; }
              .detalle, .total { margin-bottom: 15px; }
              hr { margin: 15px 0; }
            </style>
          </head>
          <body>
            <h1 style="text-align:center; color:#ff4757;">🎬 CineAura</h1>
            ${contenido}
            <p style="text-align:center; margin-top:30px;">Gracias por tu preferencia 💖</p>
          </body>
        </html>
      `);
      ventana.document.close();
      ventana.focus();
      ventana.print();
      ventana.close();
    });