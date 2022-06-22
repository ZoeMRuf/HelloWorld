//imports our map information that we saved into Map.json

const maps = require("../../Data/Maps.json");
//Map info model
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

//where map information are handeld
class Maps{
    constructor() {
        this.implementedMapModel = new MapModel();
    }

    //return map information
    getMapData(){
        return this.implementedMapModel;
    }

    //assigns the map informations to the map information object
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

        //if there is no information in the object it is added
        if(this.implementedMapModel !== undefined){
            return this.assignMapData(id);
        }

    }


    //replaces the information that is in the object
    updateMapData(id){
        return this.assignMapData(id);
    }
}

//exports methods
const mapData = new Maps();
module.exports = mapData;