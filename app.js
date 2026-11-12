// ======================================================
// DOMÁCÍ HLÍDAČ
// ======================================================

console.log("Domácí hlídač spuštěn");

// ======================================================
// FUNKCE
// ======================================================

function spocitejKonecZaruky(
    purchaseDate,
    warrantyMonths
){

    if(
        !purchaseDate ||
        warrantyMonths === null
    ){
        return "⚪ Datum nákupu neznámé";
    }

    const konec = new Date(
        purchaseDate
    );

    konec.setMonth(
        konec.getMonth() + warrantyMonths
    );

    return konec.toLocaleDateString(
        "cs-CZ"
    );
}

function formatujCenu(cena){

    return Number(cena).toLocaleString("cs-CZ");

}

function ulozMajetek(){

    localStorage.setItem(
        "assets",
        JSON.stringify(assets)
    );

}

function vratTriduZaruky(
    purchaseDate,
    warrantyMonths
){

    if(
        !purchaseDate ||
        warrantyMonths === null
    ){
        return "";
    }

    const dnes = new Date();

    const nakup = new Date(
        purchaseDate
    );

    const konec = new Date(
        purchaseDate
    );

    konec.setMonth(
        konec.getMonth() + warrantyMonths
    );

    if(dnes > konec){

        return "expired";

    }

    const celkem =
        konec - nakup;

    const zbyva =
        konec - dnes;

    const procento =
        zbyva / celkem;

    if(procento <= 0.5){

        return "warning";

    }

    return "active";

}

// ======================================================
// VÝCHOZÍ MAJETEK
// ======================================================

const pixel = {

    id: 1,

    name: "Pixel 10",

    category: "Telefon",

    price: 24990,

    currency: "Kč",
    
    seller: "Alza",

    serialNumber: "PIX10-ABC123",

    note: "Soukromý telefon",

    purchaseDate: "2026-10-12",

    warrantyMonths: 24

};

const lenovo = {

    id: 2,

    name: "Lenovo ThinkPad",

    category: "Notebook",

    price: 34990,

    currency: "Kč",
    
    seller: "Alza",

    serialNumber: "LEN-T14-987",

    note: "Soukromý notebook",

    purchaseDate: "2026-11-15",

    warrantyMonths: 24

};

const bosch = {

    id: 3,

    name: "Myčka Bosch",

    category: "Domácnost",

    price: 12490,

    currency: "Kč",
    
    seller: "Datart",

    serialNumber: "BOS-456789",

    note: "",

    purchaseDate: "2026-08-28",

    warrantyMonths: 24

};

const samsung = {

    id: 4,

    name: "Samsung OLED",

    category: "Televize",

    price: 39990,

    currency: "Kč",
    
    seller: "Planeo",

    serialNumber: "SAM-OLED-001",

    note: "Obývací pokoj",

    purchaseDate: "2026-05-01",

    warrantyMonths: 24

};

// ======================================================
// LOCAL STORAGE
// ======================================================

let assets = [];

const ulozenyMajetek =
    localStorage.getItem(
        "assets"
    );

if(ulozenyMajetek){

    assets =
        JSON.parse(
            ulozenyMajetek
        );

}
else{

    assets = [

        pixel,
        lenovo,
        bosch,
        samsung

    ];

    ulozMajetek();

}

// ======================================================
// MODÁLNÍ OKNO
// ======================================================

const modal =
    document.getElementById(
        "asset-modal"
    );

const showModal =
    document.getElementById(
        "show-modal"
    );

const closeModal =
    document.getElementById(
        "close-modal"
    );

let selectedCurrency = "Kč";

const currencyButton =
    document.getElementById(
        "currency-button"
    );

const currencyMenu =
    document.getElementById(
        "currency-menu"
    );

showModal.addEventListener(
    "click",
    function(){

        modal.classList.remove(
            "hidden"
        );

    }
);

closeModal.addEventListener(
    "click",
    function(){

        modal.classList.add(
            "hidden"
        );

    }
);

if(
    currencyButton &&
    currencyMenu
){

    currencyButton.addEventListener(
        "click",
        function(){

            currencyMenu.classList.toggle(
                "hidden"
            );

        }
    );

    currencyMenu
        .querySelectorAll("div")
        .forEach(function(option){

            option.addEventListener(
                "click",
                function(){

                    selectedCurrency =
                        this.dataset.value;

                    currencyButton.textContent =
                    this.textContent;

                    currencyMenu.classList.add(
                        "hidden"
                    );

                }
            );

        });

}

// ======================================================
// GRID MAJETKU
// ======================================================

const assetsGrid =
    document.getElementById(
        "assets-grid"
    );

// ======================================================
// VYKRESLENÍ MAJETKU
// ======================================================

function vykresliMajetek(){

    assetsGrid.innerHTML = "";

    assets.forEach(function(item){

        assetsGrid.innerHTML += `

            <a href="detail.html?id=${item.id}" class="asset-link">

                <div class="asset-card">

                    <div class="asset-name">
                        ${item.name}
                    </div>

                    <div class="asset-category">
                        ${item.category}
                    </div>

                    <div class="asset-price">
    ${
                        item.price === null
                            ? "Cena neuvedena"
                            : `${formatujCenu(item.price)} ${item.currency}`
                        }
                    </div>

                    <div class="asset-divider"></div>

                    <div class="asset-warranty">

                        ${
                            item.purchaseDate === null
                            ?
                            '<span class="unknown">⚪ Datum nákupu neznámé</span>'
                            :
                            `Záruka do:
                            <span class="${vratTriduZaruky(
                                item.purchaseDate,
                                item.warrantyMonths
                            )}">
                                ${spocitejKonecZaruky(
                                    item.purchaseDate,
                                    item.warrantyMonths
                                )}
                            </span>`
                        }

                    </div>

                </div>

            </a>

        `;

    });

}

// ======================================================
// PRVNÍ VYKRESLENÍ
// ======================================================

vykresliMajetek();

// ======================================================
// PŘIDÁNÍ POLOŽKY
// ======================================================

const saveButton =
    document.getElementById(
        "save-asset"
    );

if(saveButton){

    saveButton.addEventListener(
        "click",
        function(){

            const name =
                document.getElementById(
                    "asset-name"
                ).value.trim();

            const category =
                document.getElementById(
                    "asset-category"
                ).value.trim();

            const price =
                document.getElementById(
                    "asset-price"
                ).value.trim();

            const purchaseDate =
                document.getElementById(
                    "asset-date"
                ).value;

            const warrantyMonths =
                document.getElementById(
                    "asset-warranty"
                ).value;

            const seller =
                document.getElementById(
                    "asset-seller"
                ).value.trim();

            const serialNumber =
                document.getElementById(
                    "asset-serial"
                ).value.trim();
                
            const unknownDate =
                document.getElementById(
                    "unknown-date"
                ).checked;

            if(
                !name ||
                !category ||
                (
                    !unknownDate &&
                    (
                        !price ||
                        !purchaseDate ||
                        !warrantyMonths
                    )
                )
            ){


                alert(
                    "Vyplňte všechna pole."
                );

                return;

            }

            const novaPolozka = {

                id: Date.now(),

                name: name,

                category: category,

                price:
                    unknownDate
                        ? null
                        : Number(price),

                currency:
                    selectedCurrency,

                    seller: seller,
                    serialNumber: serialNumber,
                    note: "",

                purchaseDate:
                    unknownDate
                        ? null
                        : purchaseDate,

                warrantyMonths:
                    unknownDate
                        ? null
                        : Number(
                            warrantyMonths
                        ),

            };

            assets.push(
                novaPolozka
            );

            ulozMajetek();

            vykresliMajetek();

            modal.classList.add(
                "hidden"
            );

            document.getElementById(
                "asset-name"
            ).value = "";

            document.getElementById(
                "asset-category"
            ).value = "";

            document.getElementById(
                "asset-price"
            ).value = "";

            document.getElementById(
                "asset-date"
            ).value = "";

            document.getElementById(
                "asset-warranty"
            ).value = "";

            document.getElementById(
                "asset-seller"
            ).value = "";

            document.getElementById(
                "asset-serial"
            ).value = "";
        }

    );

}
const unknownDateCheckbox =
    document.getElementById(
        "unknown-date"
    );

if(unknownDateCheckbox){

    unknownDateCheckbox.addEventListener(
        "change",
        function(){

            const priceField =
                document.getElementById(
                    "asset-price"
                );

            const dateField =
                document.getElementById(
                    "asset-date"
                );

            const warrantyField =
                document.getElementById(
                    "asset-warranty"
                );

            priceField.disabled =
                this.checked;

            dateField.disabled =
                this.checked;

            warrantyField.disabled =
                this.checked;

            if(this.checked){

                priceField.value = "";

                dateField.value = "";

                warrantyField.value = "";

            }
        }
    );
}