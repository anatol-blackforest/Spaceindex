//Предварительный обработчик форм (добавление или редактирование)
const add = require('./add');
const change = require('./change');
const {bigImage, notImage, sitename} = require('./messages');

//typeOfEdit - тип формы (редактирование или добавление нового)
module.exports = (err, req, res, typeOfEdit) => {
	//если рисунок огромен, то предупреждаем
	if (err) return res.render('index', { hint: bigImage, isAdmin: req.isAuthenticated() });
	//если загруженный файл - НЕ рисунок
	if (req.file && req.file.mimetype && req.file.mimetype.indexOf('image') === -1) return res.render('index', { hint: notImage, isAdmin: req.isAuthenticated() }); 
	//если заливка валидирована
	switch(typeOfEdit){
		//при добавлении
		case "add" : {
			add(req, res)
			break
		};
		//при редактировании
		case "change" : {
			change(req, res)
			break
		};
	}
};
