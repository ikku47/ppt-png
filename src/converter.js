import pdf2png from './pdf2png.js';
import ppt2pdf from './ppt2pdf.js';
import {
    File,
    Converter
} from '@hckrnews/converter';
/**
 * Converter
 */
class Ppt2PngConverter extends Converter {
    /**
     * Define the files array
     */
    constructor() {
        super();
        this.file = '';
    }

    /**
     * Set the files
     *
     * @param {array} files
     */
    setFile(file) {
        this.file = File.create({
            filePath: file
        });
    }

    /**
     * Convert ppt files to pdf files.
     *
     * @return {array}
     */
    convert() {
        return 
            const pdf = ppt2pdf({
                file:this.file,
                output: this.output
            });

            return pdf2png({
                file:   pdf,
                output: this.output
            });
       
    }

    /**
     * Create the converter
     *
     * @param {array} files
     *
     * @return {object}
     */
    static create({
        file,
        output
    }) {
        const converter = new Ppt2PngConverter();

        converter.setFile(file);
        converter.setOutput(output);

        return converter;
    }
}

export default Ppt2PngConverter;
export {
    Ppt2PngConverter,
    pdf2png,
    ppt2pdf
};
