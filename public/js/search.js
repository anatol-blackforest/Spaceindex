const searchFunc = function(){
    const searchOpenButton = document.getElementById('searchOpenButton');
    const searchBlock = document.getElementById('searchBlock');
    
    // поведение формы добавления новости
        
    searchOpenButton.addEventListener("click", function(e){
        e.preventDefault();
        searchBlock.classList.toggle("hide");
    });
}

window.addEventListener('load', searchFunc, false);
