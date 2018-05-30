const mInlineJsLoadFunc = function(){
  const upload = document.getElementById("upload");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const type = document.getElementById("type");
  const parentPlanet = document.getElementById("parentPlanet");

  let enabled_post = true;

  upload.addEventListener("submit", function(e){
    e.preventDefault();
    if(title.value && description.value){
      if(enabled_post){
        if(type.value == "moon"){
          if(parentPlanet.value.trim()){
            upload.submit();
            enabled_post = false;
          }else{
            alert("Введите материнскую планету!");
          }
        }else{
          upload.submit();
          enabled_post = false;
        }
      }
    }else{
      alert("Введите название и описание!");
    }
  });

}

window.addEventListener('load', mInlineJsLoadFunc, false);
