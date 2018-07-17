// место, куда файл будет загружен 
const thumb = require('node-thumbnail').thumb;
const path = require('path');
const fs = require('fs');
const formHandler = require('./formhandler');

//выбираем действие
const formFunc = (err, req, res) => {
    //если редактируем
    if(Boolean(req.body.edit)) return formHandler(err, req, res, "change");
    //если добавляем новое
    formHandler(err, req, res, "add");
}

module.exports = (err, req, res) => {
    if(req.file){
        const tmp = path.join(req.file.destination, req.file.filename);
        const target = path.join('public', 'uploades', req.file.filename);
        const thumbs = path.join('public', 'uploades', 'thumbs');
        const src = fs.createReadStream(tmp); 
        const dest = fs.createWriteStream(target);
        src.pipe(dest); 
        // обработка результатов загрузки 
        src.on('end', () => { 
            //создаем тумбинашки
            thumb({
                source: tmp, 
                destination: thumbs,
                width: 100,
                concurrency: 4,
                prefix: '',
                suffix: ''
            }, (files, err, stdout, stderr) => {
                // удалить файл временного хранения данных
                fs.unlink(tmp); 
                formFunc(err, req, res)
            });
        });
        src.on('error', err => { 
            // удалить файл временного хранения данных
            fs.unlink(tmp);  
            res.send('error'); 
        });
    }else{
        formFunc(err, req, res)
    }
};
