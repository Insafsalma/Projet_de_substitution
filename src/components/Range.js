
export class Rangee
{
    constructor(id,lignes)
    {
        this.id = id;
        this.lignes = lignes;
    }

    get id()
    {
        return this._id;
    }

    get lignes()
    {
        return this._lignes;
    }

    set id(value)
    {
        this._id = value;
    }

    set lignes(value)
    {
        this._lignes = value;
    }
}
export default new Range(0,[]);