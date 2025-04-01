class MemeModel extends Model {
    constructor(content, lucu, biasa) {
        this.content = content;
        this.lucu = lucu;
        this.biasa = biasa;
    }

    toJson() {
        data = {
            content: this.content,
            lucu: this.lucu,
            biasa: this.biasa
        }

        return JSON.stringify(data);
    }

    fromJson(data) {
        const data_parse = JSON.parse(data);
        this.content = data_parse.content;
        this.lucu = data_parse.lucu;
        this.biasa = data_parse.biasa;
    }
}