const axios = require("axios");

class UserController {
  getPrimos(req, res) {
    const primos = [];
    let numero = 150;

    function isPrime(num) {
      if (num < 2) return false;
      for (var i = 2; i < num; i++) {
        if (num % i == 0) return false;
      }
      return true;
    }

    for (var i = 0; i < numero; i++) {
      if (isPrime(i)) {
        primos.push(i);
      }
    }

    const primosInfo = {
      cantidad: primos.length,
      lista: primos,
    };
    res.json(primosInfo);
  }

  async getUser(req, res) {
    const user = req.params.id;
    const data = await axios.get(`https://api.github.com/users/${user}`);
    res.json(data.data);
  }

  async getUser2(req, res) {
    const user = req.params.id;
    const data = await axios.get(`https://api.github.com/users/${user}`);
    const { name, company, bio } = data.data;
    const modeledData = {
      nombre: name,
      empresa: company,
      bio: bio,
    };
    res.json({ ...modeledData, edad: 23, helado: "menta granizada" });
  }

  async getPokemonesPrimos(req, res) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    const pokemones = data.data.results;
    const primos = [];

    function isPrime(num) {
      if (num < 2) return false;
      for (var i = 2; i < num; i++) {
        if (num % i == 0) return false;
      }
      return true;
    }

    for (var i = 0; i < 150; i++) {
      if (isPrime(i)) {
        primos.push(i);
      }
    }

    let hola = primos.map((num) => {
      return {
        numero: num,
        pokemon: pokemones[num].name,
      };
    });

    res.send(hola);
  }

  getName(req, res) {
    res.send(`mi nombre es ${req.params.name} y mi edad es ${req.query.edad}`);
  }

  getNum(req, res) {
    const num = req.params.num;
    const multiplicacion = num * 2;
    res.send(`${num} multiplicado por 2 es: ${multiplicacion}`);
  }

  getPalindromo(req, res) {
    const str = req.params.str;
    const reverse = str.split("").reverse().join("");
    reverse == str
      ? res.send(`La frase ${str} es un palíndromo ya que al revés se lee: ${reverse}.`)
      : res.send(`La frase ${str} NO es un palíndromo ya que al revés se lee: ${reverse}.`);
  }
}

module.exports = UserController;
