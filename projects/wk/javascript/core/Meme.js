class Meme {

    data = [];
    currentDataIndex = 0;
    isLoading = false;
    isText = false;
    text_element_id = '#meme_text';
    image_element_id = '#meme_image';
    lucu_button_id = '#lucu_button';
    biasa_button_id = '#biasa_button';
    nextDataIndexDelay = 1000;

    constructor(json_data_file_path, isText = false) {
        this.setData(json_data_file_path);
        this.isText = isText;
    }

    async setData(json_data_file_path) {
        this.data = (await axios.get(json_data_file_path)).data;
        this.renderData();
    }

    getData(index) {
        return this.data[index];
    }

    setCurrentDataIndex(value) {
        this.currentDataIndex = value;
    }

    nextDataIndex() {
        setTimeout(() => {
            if(this.currentDataIndex < this.data.length) {
                this.currentDataIndex++;
            }else{
                this.currentDataIndex = 0;
            }
            this.setButtonDisable(false);
            this.renderData();
        }, this.nextDataIndexDelay);
    }

    setButtonDisable(value) {
        $(this.lucu_button_id).prop('disabled', value);
        $(this.biasa_button_id).prop('disabled', value);
    }

    lucuBangetButton() {
        this.setButtonDisable(true);
        this.data[this.currentDataIndex].lucu += 1;
        this.renderData();
        this.nextDataIndex();
    }

    biasaAjaButton() {
        this.setButtonDisable(true);
        this.data[this.currentDataIndex].biasa += 1;
        this.renderData();
        this.nextDataIndex();
    }

    renderData() {
        try {
            if(this.isText) {
                $(this.text_element_id).html(`"${this.data[this.currentDataIndex].text}"`);
            }else{
                $(this.image_element_id).attr("src", `data/images/${this.data[this.currentDataIndex].image}`);
            }
            $(this.lucu_button_id).html(`${formatNumber(this.data[this.currentDataIndex].lucu)} Lucu banget`);
            $(this.biasa_button_id).html(`${formatNumber(this.data[this.currentDataIndex].biasa)} Biasa aja`);
        } catch (error) {
            
        }
    }

}