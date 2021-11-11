module.exports = {getPagination, getPagingData, saveBase64, deleteFile};
function getPagination(page, size){
    page = page-1
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
}
  
function getPagingData(data, page, limit){
    const { rows: registros } = data;

    const totalItems = data.count
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit) ;
  
    return { totalItems, registros, totalPages, currentPage };
}


function saveBase64(base64String, ruta){
    var base64Data = base64String.replace(/^data:image\/png;base64,/, "");
    var filename = new Date().getTime()+".png";
    require("fs").writeFile(ruta+"/"+filename, base64Data, 'base64', function(err) {
      console.log(err);
    });

    return filename;
}


function deleteFile(filePath){
    try {
        
        require("fs").unlinkSync(filePath);
      } catch (err) {
          console.log(err)
      }
}