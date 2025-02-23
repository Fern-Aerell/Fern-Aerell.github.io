// Menginisialisasi objek outputs yang berisi elemen output kalkulator
const output = document.getElementById("output"); // Menyimpan elemen output

// Menginisialisasi objek buttons yang berisi elemen tombol kalkulator
const buttons = {
    clear: document.getElementById("button_clear"), // Tombol reset
    delete: document.getElementById("button_delete"), // Tombol hapus
    equal: document.getElementById("button_equal"), // Tombol sama dengan
    comma: document.getElementById("button_coma"), // Tombol koma
    percent: document.getElementById("button_percen"), // Tombol persen
    positiveNegative: document.getElementById("button_positive_negative"), // Tombol positif/negatif

    // Elemen untuk operator matematika
    operators: {
        div: document.getElementById("button_div"), // Tombol bagi
        mul: document.getElementById("button_mul"), // Tombol kali
        sub: document.getElementById("button_sub"), // Tombol kurang
        add: document.getElementById("button_add") // Tombol tambah
    },

    // Elemen untuk angka
    numbers: Array.from({ length: 10 }, (_, i) =>
        document.getElementById(`button_${i}`) // Menyimpan tombol angka 0-9
    )
};

// Kelas Kalkulator untuk menangani seluruh logika kalkulator
class Calculator {
    // Simbol operator matematika
    OPERATORS = ['÷', 'x', '-', '+'];

    constructor(output, buttons) {
        this.output = output;
        this.buttons = buttons;

        // Menambahkan event listener untuk setiap tombol
        this.buttons.clear.addEventListener("click", () => this.clear()); // Tombol reset
        this.buttons.delete.addEventListener("click", () => this.delete()); // Tombol hapus
        this.buttons.equal.addEventListener("click", () => this.calculate()); // Tombol sama dengan
        this.buttons.comma.addEventListener("click", () => this.insertComma()); // Tombol koma
        this.buttons.percent.addEventListener("click", () => this.insertPercent()); // Tombol persen
        this.buttons.positiveNegative.addEventListener("click", () => this.toggleSign()); // Tombol positif/negatif

        // Menambahkan event listener untuk tombol angka
        this.buttons.numbers.forEach((btn, num) =>
            btn.addEventListener("click", () => this.insertNumber(num))
        );

        // Menambahkan event listener untuk tombol operator matematika
        Object.values(this.buttons.operators).forEach((btn, index) =>
            btn.addEventListener("click", () => this.insertOperator(this.OPERATORS[index]))
        );
    }

    // Fungsi untuk mengatur ulang kalkulator
    clear() {
        this.output.innerText = "0"; // Mengatur ulang output menjadi 0
    }

    // Fungsi untuk menghapus angka terakhir pada output bawah
    delete() {
        const startColumnNegatif = this.output.innerText.search('\\(-[0-9]+\\)$');
        if (startColumnNegatif != - 1) {
            this.output.innerText = this.output.innerText.slice(0, startColumnNegatif) + this.output.innerText.slice(startColumnNegatif).substr(2, this.output.innerText.slice(startColumnNegatif).length - 3);
            return;
        }

        // Hapus satu karakter terakhir, jika kosong tampilkan 0
        this.output.innerText = this.output.innerText.slice(0, -1) || "0";
    }

    // Fungsi untuk memulihkan dari error pada hasil perhitungan
    recoveryFromError() {
        // Memeriksa apakah ada error (∞ atau kesalahan) pada output dan mengatur ulang kalkulator
        if (["∞", "kesalahan"].includes(this.output.innerText.toLowerCase())) {
            this.clear(); // Reset kalkulator
        }
    }

    // Fungsi untuk memasukkan angka pada output bawah
    insertNumber(num) {
        this.recoveryFromError(); // Memeriksa apakah ada error

        if (this.output.innerText.search("([0-9]+|[0-9]+,[0-9]+)%$") != -1) return;

        // Jika output berakhiran ",0", ganti 0 dengan angka baru
        if (this.output.innerText.endsWith(",0")) {
            this.output.innerText = this.output.innerText.slice(0, -1);
            this.output.innerText += num;
            return;
        }

        // Jika output adalah 0, tampilkan angka yang dimasukkan, jika tidak tambahkan angka pada output
        this.output.innerText =
            this.output.innerText === "0"
                ? num
                : this.output.innerText + num;
    }

    // Fungsi untuk menambahkan koma pada angka
    insertComma() {
        this.recoveryFromError(); // Memeriksa error

        if (this.output.innerText.search('[0-9]+,[0-9]+$') != -1) return;

        if (this.output.innerText.search('[0-9]+$') != -1) {
            this.output.innerText += ',0';
        }
    }

    // Fungsi untuk menambahkan operator matematika pada output
    insertOperator(op) {
        this.recoveryFromError(); // Memeriksa error

        // Hapus karakter terakhir dari output jika karakter terakhir nya adalah operator.
        if (this.OPERATORS.includes(this.output.innerText.slice(-1))) {
            this.delete();
        }

        // Tambahkan operator ke output
        this.output.innerText += op;
    }

    // Fungsi untuk menghitung hasil dari ekspresi matematika
    calculate() {
        this.recoveryFromError(); // Memeriksa error

        if (this.output.innerText == '20112005') {
            this.output.innerText = 'Fern Aerell'
            return;
        }

        if (this.output.innerText.length > 0) {
            this.output.innerText = this.evaluation(this.output.innerText);
        }
    }

    // Fungsi untuk menambahkan simbol persen pada angka
    insertPercent() {
        this.recoveryFromError(); // Memeriksa error

        if (this.output.innerText.length > 0 && this.output.innerText.search("([0-9]+|[0-9]+,[0-9]+)%$") == -1 && !this.OPERATORS.includes(this.output.innerText.slice(-1))) {
            this.output.innerText += '%';
        }
    }

    // Fungsi untuk mengubah tanda angka (positif/negatif)
    toggleSign() {
        this.recoveryFromError(); // Memeriksa error

        const display = this.output.innerText;

        if (display == 0) return;

        const startColumnNoNegatif = display.search('([0-9]+|[0-9]+,[0-9]+)$');
        if (startColumnNoNegatif != -1) {
            this.output.innerText = display.slice(0, startColumnNoNegatif) + "(-" + display.slice(startColumnNoNegatif) + ")";
            return;
        }

        const startColumnNegatif = display.search('\\(-([0-9]+|[0-9]+,[0-9]+)\\)$');
        if (startColumnNegatif != - 1) {
            this.output.innerText = display.slice(0, startColumnNegatif) + display.slice(startColumnNegatif).substr(2, display.slice(startColumnNegatif).length - 3);
            return;
        }
    }

    // Fungsi untuk mengevaluasi ekspresi matematika
    evaluation(expression) {
        return String(
            eval(
                expression
                    .replaceAll('%', '/100')
                    .replaceAll('÷', '/')
                    .replaceAll('x', '*')
                    .replaceAll('.', '')
                    .replaceAll(',', '.')
                    .replaceAll('Fern Aerell', '20112005')
            )
        )
            .replaceAll('.', ',')
            .replaceAll("Infinity", "∞")
            .replaceAll("NaN", "Kesalahan")
            ;
    }
}

// Menginisialisasi kalkulator
new Calculator(output, buttons);