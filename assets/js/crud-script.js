
var pesanan, user, alamat, noHp, pengiriman, catatan, totHarga=0;
function save() {
    validateForm()

}

function checkout(){
  
  $(".cd-cart__checkout").remove();
  $(".cd-cart__footer").html('<a href="#0" class="cd-cart__checkout"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></a>')

  var listPesanan=[]
  var kodeOrder=[]

  user = $( "#nama-p" ).val();
  alamat = document.getElementById("alamat").value +" ,"+document.getElementById("kelurahan").value+" ,"+document.getElementById("kecamatan").value+" ,"+document.getElementById("kode-pos").value;
  pengiriman = document.getElementById("pengiriman").value;
  noHp = $( "#no-hp" ).val();
  catatan = $( "#catatan" ).val();

  //save session storage
  localStorage.setItem('user', user);
  localStorage.setItem('alamat', alamat);
  localStorage.setItem('noHp', noHp);
  localStorage.setItem('catatan', catatan);


      $('.cd-cart__product').each(function(){
          var namaProduct = this.getAttribute('data-product')
          var harga = this.getAttribute('data-harga')
          var productId = this.getAttribute('data-bahan')
          // var qty = $('#cd-product-'+productId+' :selected').text()
          const qtyPrd = document.getElementById("cd-product-"+productId);
          console.log("========"+qtyPrd.value)

          listPesanan.push("%0A"+namaProduct +" (harga: Rp. "+harga.toLocaleString('id-ID')+", jumlah :"+qtyPrd.value+")")
          kodeOrder.push(productId+"|"+qtyPrd.value)

          hargaQty = harga*qtyPrd.value
          totHarga += parseInt(hargaQty)

      }); 
      console.log(listPesanan) 


      var url = script_url+"?callback=sendWA&pesanan="+listPesanan.join()+"&totHarga="+totHarga+"&user="+user+"&noHp="+noHp+"&alamat="+alamat+"&catatan="+catatan+"&kodeOrder="+kodeOrder;
          url += "&pengiriman="+pengiriman
          url += "&action=insert"

      pesanan = listPesanan.join()
      console.log(url)

      var request = jQuery.ajax({
          crossDomain: true,
          url: url ,
          method: "GET",
          dataType: "jsonp"
      });
}

function validateForm() {
  let nama = document.forms["fCustomer"]["nama"].value;
  let noHp = document.forms["fCustomer"]["noHp"].value;
  let alamat = document.forms["fCustomer"]["alamat"].value;
  let pengiriman = document.forms["fCustomer"]["pengiriman"].value;
  let kelurahan = document.forms["fCustomer"]["kelurahan"].value;
  let kecamatan = document.forms["fCustomer"]["kecamatan"].value;
  let kodePos = document.forms["fCustomer"]["kodePos"].value;
 
  if (nama == "" || noHp == "" || alamat == "" || pengiriman == "Pilih"
    || kelurahan == "" || kecamatan == "" || kodePos == ""
   ) {
    document.getElementById("collapseOne").classList.add('show');
    alert("Mohon Lengkapi Data Pengiriman");
    return false;
  }else{
    checkout()
  }
}
  
  
  // Make an AJAX call to Google Script
  function insert_value() {
    
	$("#re").css("visibility","hidden");
	 document.getElementById("loader").style.visibility = "visible";
	$('#mySpinner').addClass('spinner');

    var id1=	$("#id").val();
	var product= $("#product").val();
	
	
    var url = script_url+"?callback=ctrlq&product="+product+"&id="+id1+"&action=insert";
  

    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });

  }
  
  function update_value(){
	$("#re").css("visibility","hidden");
     document.getElementById("loader").style.visibility = "visible";
	
	
var id1=	$("#id").val();
	var name= $("#name").val();
	
	
	
    var url = script_url+"?callback=ctrlq&name="+name+"&id="+id1+"&action=update";
  

    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });

	
  }

  
 
  
  
  function delete_value(){
	$("#re").css("visibility","hidden");
     document.getElementById("loader").style.visibility = "visible";
	$('#mySpinner').addClass('spinner');
    var id1=	$("#id").val();
	var name= $("#name").val();
	
	
    var url = script_url+"?callback=ctrlq&name="+name+"&id="+id1+"&action=delete";
  

    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });

  }


  
  
  // print the returned data
  function ctrlq(e) {
  
    alert(e.result)
    location.reload();
    // $(".cd-cart__footer").css("backgroud-color","green")
    
	// $("#re").html(e.result);
	// $("#re").css("visibility","visible");
	//read_value();
	// location.reload();

  }
  
  

  
function read_value() {

$("#re").css("visibility","hidden");
   
   document.getElementById("loader").style.visibility = "visible";
 var url = script_url+"?action=read";

$.getJSON(url, function (json) {

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    var header = table.createTHead();
		var row = header.insertRow(0);     
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
	
		cell1.innerHTML = "<b>ID</b>";
		cell2.innerHTML = "<b>Name</b>";
        
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < json.records.length; i++) {

            tr = table.insertRow(-1);
				var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].ID;
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = json.records[i].NAME;
            }
      

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
		document.getElementById("loader").style.visibility = "hidden";
		$("#re").css("visibility","visible");
    });
	}
  

  function sendWA(e){
    var textWA = "https://wa.me/6288212493692?text="
    textWA += "Halo Mau Makan !"
    textWA += "%0A=============="
    textWA += "%0AOrder ID : "+e.orderId
    textWA += "%0A=============="
    textWA += "%0APenerima : "+user
    textWA += "%0ANo Hp : "+noHp
    textWA += "%0AAlamat : "+alamat
    textWA += "%0ACatatan : "+catatan
    textWA += "%0AJadwal Pengiriman : "+pengiriman
    textWA += "%0A=============="
    textWA += "%0APesanan : "+pesanan
    textWA += "%0A=============="
    textWA += "%0ATotal : Rp. "+totHarga.toLocaleString('id-ID')
    textWA += "%0A*Belum Termasuk Ongkos Kirim dan biaya packing"


    location.href = textWA
  }