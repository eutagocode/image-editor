const sharp = require("sharp");

const path = process.argv[2];
const width = parseFloat(process.argv[3]);

const resize = (path, width) => {
    sharp(path)
        .resize({ width: width })
        .toFile("./temp/output_resize.jpg", (error) => {
            if (error) throw error;

            console.log("Imagem redimensionada com sucesso!");
        });
};

resize(path, width);
