import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as htmlPdf from 'html-pdf-node';
import * as Handlebars from 'handlebars';

@Injectable()
export class PdfService {
  constructor() {
    Handlebars.registerHelper('multiply', (a, b) => (a * b).toFixed(2));

    Handlebars.registerHelper('formatDate', (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    });

    Handlebars.registerHelper('formatDateTime', (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    });
  }

  async generateInvoicePdf(data: any): Promise<Buffer> {
    try {
      console.log('🚧 Starting PDF generation');

      const templatePath = path.resolve(
        __dirname,
        'templates',
        'invoice.template.html',
      );

      const templateContent = await fs.readFile(templatePath, 'utf-8');
      const template = Handlebars.compile(templateContent);

      const invoiceData = {
        ...data,
        datetime: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        paymentTerms: 30,
        items: data.items.map((item) => ({
          ...item,
          description: item.name,
          quantity: item.quantity || 1,
        })),
      };

      const html = template(invoiceData);

      const file = { content: html };
      const pdfBuffer = await htmlPdf.generatePdf(file, {
        format: 'A4',
        margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
      });

      console.log('✅ PDF generated');

      return pdfBuffer;
    } catch (err) {
      console.error('❌ Error during PDF generation:', err);
      throw err;
    }
  }
}
