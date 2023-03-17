import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Definisci il CSS personalizzato
const styles = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 0, 0, 10],
    alignment: 'center',
  },
  subheader: {
    fontSize: 14,
    bold: true,
    margin: [0, 10, 0, 5],
  },
  tableHeader: {
    bold: true,
    fontSize: 12,
    color: 'black',
    fillColor: '#f2f2f2',
  },
  tableCell: {
    fontSize: 12,
    color: 'black',
  },
  totalPrice: {
    bold: true,
    fontSize: 14,
    margin: [0, 10, 0, 0],
    alignment: 'right',
  },
};

// Inizializza la libreria pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function printScontrino(scontrino) {



    
  // Crea il contenuto del documento
  const documentDefinition = {
    content: [
      { text: 'Il mio ristorante', style: 'header' },
      { text: `Scontrino n. ${scontrino.id}`, style: 'subheader' },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto'],
          body: [
            [
              { text: 'Portata', style: 'tableHeader' },
              { text: 'Prezzo', style: 'tableHeader' },
              { text: 'Quantità', style: 'tableHeader' },
            ],
            ...scontrino.items.map((item) => [
              item.name,
              item.price.toFixed(2),
              item.quantity.toString(),
            ]),
          ],
        },
        layout: 'lightHorizontalLines',
      },
      {
        text: `Totale: ${scontrino.total.toFixed(2)} €`,
        style: 'totalPrice',
      },
    ],
    styles: styles,
  };

  // Crea il PDF e lo apre in una nuova finestra
  pdfMake.createPdf(documentDefinition).open();
}
