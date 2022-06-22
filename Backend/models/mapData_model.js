const maps = require("../../Data/Maps.json");

class MapModel{
    constructor(creationDate, creator, description, distortion, graticule, limitations, usage, pathToImage, title) {
        this.creationDate = creationDate;
        this.creator = creator;
        this.description = description;
        this.distortion = distortion;
        this.graticule = graticule;
        this.limitations = limitations;
        this.usage = usage;
        this.pathToImage = pathToImage
        this.title = title;
    }
}

class Maps{
    constructor() {
        this.implementedMapModel = new MapModel();
    }


    getMapData(){
        return this.implementedMapModel;
    }

    assignMapData(id){
        this.implementedMapModel.creationDate = maps[id].creationDate;
        this.implementedMapModel.creator = maps[id].creator;
        this.implementedMapModel.description = maps[id].infoText.description;
        this.implementedMapModel.distortion = maps[id].infoText.distortion;
        this.implementedMapModel.graticule = maps[id].infoText.graticule;
        this.implementedMapModel.limitations = maps[id].infoText.limitations;
        this.implementedMapModel.usage = maps[id].infoText.usage;
        this.implementedMapModel.pathToImage = maps[id].pathToImage;
        this.implementedMapModel.title = maps[id].title;

        return this.getMapData();
    }

    addMapData(id){

        if(this.implementedMapModel !== undefined){
            return this.assignMapData(id);
        }

    }

    updateMapData(id){
        return this.assignMapData(id);
    }
}

const mapData = new Maps();
module.exports = mapData;