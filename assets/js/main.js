const colors = ['#FFC717'];
let totalStock = 417;
const listGift = [
    {
        name: 'Voucher BEST: 1000K',
        stock: 1,
        image: './assets/img/Best_1000k.png'
    },
    {
        name: 'Voucher BEST: 500K',
        stock: 1,
        image: './assets/img/Best_500k.png'
    },
    {
        name: 'Voucher BEST: 200K',
        stock: 5,
        image: './assets/img/Best_200k.png'
    },
    {
        name: 'Voucher BEST: 100K',
        stock: 10,
        image: './assets/img/Best_100k.png'
    },
    {
        name: 'Voucher PGI: 500K',
        stock: 50,
        image: './assets/img/PGI_500k.jpg'
    },
    {
        name: 'Voucher PGI: 200K',
        stock: 50,
        image: './assets/img/PGI_200k.jpg'
    },
    {
        name: 'Voucher PGI: 100K',
        stock: 300,
        image: './assets/img/PGI_100k.jpg'
    },
    
];
(() => {
    const $ = document.querySelector.bind(document);
    const wheel = $('.wheel');
    const btnSpin = $('.spin-btn');
    let timer = 7000; // Thời gian cho mỗi lần quay
    let isRotating = false; // Đang quay hay không?
    let currentRotate = 0;
    const giftSize = listGift.length;
    const rotate = 360 / giftSize;
    const skewY = 90 - rotate; 
    const renderGift = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');
            itemGift.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
            itemGift.innerHTML = `
                <p class="text-item" style="
                    background-color: ${colors[index % colors.length]};
                    transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
                ">
                    <b> ${item.name}</b>
                </p>
                <img class="wheel-img" src="${item.image}"
                    style="
                        left: ${rotate/1.75}px;
                        bottom: ${rotate/0.85}px;
                        transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
                    " />
            `;
            wheel.appendChild(itemGift);
        })
    }
    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    }
    const getGift = (randomNumber) => {
        let isFirst = true;
        let currentPercent = 0;
        let list = [];
        listGift.forEach((item, index) => {
            currentPercent += item.stock/totalStock;
            if (randomNumber <= currentPercent && item.stock>0 ) {
                list.push({ ...item, index });
            if (isFirst) {
                    item.stock=item.stock-1;
                    isFirst=false;
            }
            }
        });
        totalStock=totalStock-1;
        console.log(listGift);
        return list[0];
    }
    const showGift = (gift) => {
        setTimeout(() => {
            isRotating = false;
            Swal.fire({
                title: 'Chúc mừng bạn đã trúng ' + gift.name,
                imageUrl: gift.image,
                imageHeight: 200
            })
        }, timer);
    }
    const spinner = () => {
        isRotating = true;
        const gift = getGift(Math.random());
        currentRotate += 360 * 10;
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
    }
    btnSpin.addEventListener('click', () => {
        !isRotating && spinner();
    });
    renderGift();
})();
function resize() {
    var width = $(window).width();
    document.documentElement.style.setProperty('--size', width > 600 ? "500px" : (width / 1.1 - 32) + "px");
}
resize();