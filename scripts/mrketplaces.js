var marketplaceList = [
    { name: "Mounir vetement", stars: 5, latitude: 36.72372780099187, longitude: 3.1376719117094645, opening: '7:00', closing: '21:00', img: './assets/mounir.jpg' },
    { name: "Boutique abdelhak", stars: 3, latitude: 36.6619633, longitude: 3.0185715, opening: '8:00', closing: '21:00', img: './assets/boutique_abdlhak.jpg' },
    { name: "Kiabi Bab Ezzouar", stars: 4, latitude: 36.793103, longitude: 3.058005, opening: '7:00', closing: '22:00', img: './assets/kiadi_babz.jpg' },
    { name: "Eyewear Sidi Yahia", stars: 2, latitude: 36.7385123, longitude: 2.9017906, opening: '8:00', closing: '21:00', img: './assets/eyewer.jpg' },
    { name: "Monulune Boutique", stars: 4, latitude: 36.7385123, longitude: 2.9017906, opening: '8:00', closing: '21:00', img: './assets/monulune.jpg' },
    { name: "DREAM Chaussures et maroquineries", stars: 3, latitude: 36.7384713, longitude: 2.9017903, opening: '8:00', closing: '21:00', img: './assets/dream.jpg' },
];

var list = marketplaceList;
var filtredList = [];

var previousPosition = 0;


function showPositionOnMap(index) {
    let map = document.getElementById('map');
    let latitude = marketplaceList[index].latitude;
    let longitude = marketplaceList[index].longitude;
    map.innerHTML = `
        <iframe width="100%" height="500" src="https://maps.google.com/maps?q=${latitude},${longitude}&output=embed">
        </iframe>
    `;
}

function selectPosition() {
    var index, table = document.getElementById('positionsTable');
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            if (typeof previousPosition != null) {
                table.rows[previousPosition].className = '';
            }
            index = this.rowIndex;
            previousPosition = index;
            this.className = 'slct-item';
            market_detail(index);
            showPositionOnMap(index);
        }
    }
}





function search() {
    const input = document.getElementById('search');
    input.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            const value = input.value;
            if (value.length == 0) {
                marketplaceList = list;
            } else {
                filtredList = marketplaceList.filter((market) => market['name'].toLowerCase().includes(value.toLowerCase()));
                marketplaceList = filtredList;
            }
            showMarketPlacesList(marketplaceList);
            selectPosition();
        }
    });
}


function showMarketPlacesList(marketplaceList) {
    let table = document.getElementById('positionsTable');
    let template = '';
    table.innerHTML = template;
    marketplaceList.forEach(market => {

        template += `
            <tr class="selected" onclick="selectCar();">
                <td><div style="display: 'flex'; flex-direction: 'column'"> <div style="font-size:13px;font-weight:700;margin-bottom:10px;">${market.name}</div>
                <div style="display:'flex';flex-direction:'row';"> 
                    ${market.stars} 
                    <span class="fa fa-star" style="color:orange;height:13px;width:13px;"></span>
                </div> 
                </div></td>
                <td><div style="font-size:13px;margin-bottom:10px">Opening</div> <div>${market.opening}</div> </td>
                <td><div style="font-size:13px;margin-bottom:10px">Closing</div> <div> ${market.closing}</div> </td>  
                <td><img src="../../heart-regular.svg" style="width:20px;height:20px;" /></td>                                                 
            </tr>
        `;
    });

    table.innerHTML += template;
    table.rows[0].className = 'slct-item';
    showPositionOnMap(0);
    market_detail(0);
}



function market_detail(index) {
    let table = document.getElementById('carDetails');
    table.innerHTML = '';
    let template = '';

    let stars = '';
    for (let i = 0; i < marketplaceList[index].stars; i++) {
        stars += '<span class="fa fa-star" style="color:orange;"></span>';
    }

    for (let i = 0; i < (5 - marketplaceList[index].stars); i++) {
        stars += '<span class="fa fa-star" ></span>';
    }

    template = `

        <div>
            <img src="${marketplaceList[index].img}" style="width:100%;height:100px;" />
            <h4 style="margin-bottom:10px;">${marketplaceList[index].name}</h4>
            <span style="display: flex;align-items:center;">
                <h4 style="margin-right:5px ;font-size:16px;font-weight:200;">${marketplaceList[index].stars}</h4>
                ${stars}  
            </span> 
            <a href="">
                <img style="margin-top:10px;height:25px;width:25px;" src="../../arrow.svg" /> 
            </a>
        </div>
    `;
    table.innerHTML = template;
    template = '';
    stars = '';


}




showMarketPlacesList(marketplaceList);
selectPosition();
search();
