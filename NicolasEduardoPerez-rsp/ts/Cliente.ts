class Cliente extends Persona
{
    //enum Sexo {FEMENINO =1, MASCULINO=2};
    public edad:number;
    //public sexo:Enumerator;
    public sexo:Sexo;
    public constructor(id:number,nombre:string,apellido:string,edad:number,sexo:Sexo)
    {
        super(id,nombre,apellido);
        this.edad = edad;
        this.sexo = sexo;
    }
    public get Sexo():string
    {
        if(this.sexo == 1)
        {
            return "femenino";
        }
        else
        {
            return "masculino"
        }
    }

}
enum Sexo{
    FEMENINO=1, MASCULINO=2
}