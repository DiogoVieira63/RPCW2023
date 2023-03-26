var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String
});

var partidoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
});

var atributosSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
});

var pessoasSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    BI: String,
    profissao: String,
    partido_politico: partidoSchema,
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: atributosSchema,
    id: String
});

var pessoaModel = mongoose.model('pessoa', pessoasSchema);

var pessoas = [
    { nome: 'Laurinda Freitas', idade: 24 },
]



{
    "nome": "Neyanne Sampaio",
    "idade": 47,
    "sexo": "feminino",
    "morada": {
      "cidade": "Ferreira do Alentejo",
      "distrito": "Beja"
    },
    "BI": "91702023-5",
    "profissao": "Programador de aplicações",
    "partido_politico": {
      "party_abbr": "Ref",
      "party_name": "Reformistas"
    },
    "religiao": "Taoísmo",
    "desportos": [
      "Peteca",
      "Rugby de praia",
      "Futebol Canadense"
    ],
    "animais": [
      "Lagarto",
      "Lobo"
    ],
    "figura_publica_pt": [
      "Gisela João"
    ],
    "marca_carro": "Mini",
    "destinos_favoritos": [
      "Vietname"
    ],
    "atributos": {
      "fumador": true,
      "gosta_cinema": false,
      "gosta_viajar": false,
      "acorda_cedo": false,
      "gosta_ler": false,
      "gosta_musica": true,
      "gosta_comer": false,
      "gosta_animais_estimacao": true,
      "gosta_dancar": false,
      "comida_favorita": "vegetariana"
    },
    "id": "p0"
  }