export class Ligne
{
    constructor(lettre,place)
    {
        this.lettre = lettre;
        this.place = place;
    }

    get lettre()
    {
        return this._lettre;
    }

    get place()
    {
        return this._place;
    }

    set lettre(value)
    {
        this._lettre = value;
    }

    set place(value)
    {
        this._place = value;
    }
}
export default new Ligne("",[]);