const sharp = require("sharp");
const compressImage = require("compress-images");
const fs = require("fs");

const path = process.argv[2];
const width = parseFloat(process.argv[3]);

const resize = (path, width) => {
    sharp(path)
        .resize({ width: width })
        .toFile("./temp/output_resize.jpg", (error) => {
            console.log("Imagem redimensionada com sucesso!");
            if (error) throw error;

            compress("./temp/output_resize.jpg", "./compressed/");
        });
};

const compress = (pathInput, pathOutput) => {
    compressImage(
        pathInput,
        pathOutput,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
            gif: {
                engine: "gifsicle",
                command: ["--colors", "64", "--use-col=web"],
            },
        },
        (error, completed, statistic) => {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        },
    );
};

resize(path, width);
