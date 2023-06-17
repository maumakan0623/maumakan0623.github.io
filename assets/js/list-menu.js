$(document).ready(function(){
    read_list_menu()

    document.getElementById("nama-p").value = localStorage.getItem('user');
    document.getElementById("alamat").value = localStorage.getItem('alamat');
    document.getElementById("no-hp").value = localStorage.getItem('noHp');
    document.getElementById("catatan").value = localStorage.getItem('catatan');

});

function read_list_menu() {
    var url = script_url+"?action=list-menu";
   $.getJSON(url, function (json) {
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < json.records.length; i++) {
            let product = json.records[i].Product;
            let harga = json.records[i].Harga;
            let menu = json.records[i].Menu;
            let bahan = json.records[i].Bahan;
      
            var x = document.getElementById("list-menu");
      
            if(menu=='yes'){
              x.innerHTML +=
              "<tr>" +
                "<td>" + product + "</td>" +
                "<td>" + harga + "</td>" +
                "<td>" + "<a href=\"#0\" class=\"cd-add-to-cart js-cd-add-to-cart\" data-price=\""+harga+"\" data-product=\""+product+"\" data-bahan=\""+bahan+"\">Add To Cart</a>" + "</td>" +
              "</tr>";
            }else{
              x.innerHTML +=
              "<tr id=\""+harga+"\" class=\"table-info\">"+
                "<th colspan=\"3\">"+product+"</th>"+
              "</tr>";
            }
      
          }
          
          generatz()

          $(".load-list").remove();
    });
}
