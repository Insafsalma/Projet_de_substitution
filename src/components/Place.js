export class Place
{
    constructor(id,vide)
    {
        this.id = id;
        this.vide = vide;
    }

    get id()
    {
        return this._id;
    }

    get vide()
    {
        return this._vide;
    }

    set id(value)
    {
        this._id = value;
    }

    set vide(value)
    {
        this._vide = value;
    }
}
export default new Place(0,"oui");