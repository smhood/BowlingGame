STRIKE = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false
}

SPAREONE = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true 
}

SPARETWO = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false 
}

ONEPIN = {
    1: false,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true 
}

GUTTER = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false 
}

PERFECTGAME = [
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE
]

SPARESTRIKE = [
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    SPAREONE,
    SPARETWO,
    STRIKE
]

STRIKESPARE = [
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    STRIKE,
    SPARETWO,
    SPAREONE
]

SPAREGAME = [
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE,
    SPARETWO,
    SPAREONE
]

RANDOMONE = [
    {
        '1': false,
        '2': true,
        '3': false,
        '4': false,
        '5': false,
        '6': true,
        '7': true,
        '8': false,
        '9': true,
        '10': false
    },
    {
        '1': false,
        '2': true,
        '3': true,
        '4': true,
        '5': false,
        '6': true,
        '7': false,
        '8': true,
        '9': true,
        '10': false
    },
    {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': true,
        '7': false,
        '8': true,
        '9': false,
        '10': true
    },
    {
        '1': false,
        '2': true,
        '3': false,
        '4': true,
        '5': true,
        '6': false,
        '7': true,
        '8': true,
        '9': false,
        '10': true
    },
    {
        '1': true,
        '2': false,
        '3': false,
        '4': true,
        '5': false,
        '6': false,
        '7': true,
        '8': false,
        '9': false,
        '10': false
    },
    {
        '1': true,
        '2': true,
        '3': true,
        '4': false,
        '5': false,
        '6': true,
        '7': true,
        '8': false,
        '9': false,
        '10': true
    },
    {
        '1': true,
        '2': true,
        '3': false,
        '4': false,
        '5': true,
        '6': false,
        '7': false,
        '8': true,
        '9': true,
        '10': true
    },
    {
        '1': true,
        '2': false,
        '3': false,
        '4': false,
        '5': true,
        '6': false,
        '7': true,
        '8': true,
        '9': true,
        '10': false
    },
    {
        '1': false,
        '2': true,
        '3': true,
        '4': false,
        '5': true,
        '6': false,
        '7': false,
        '8': false,
        '9': true,
        '10': false
    },
    {
        '1': false,
        '2': true,
        '3': false,
        '4': false,
        '5': false,
        '6': true,
        '7': false,
        '8': true,
        '9': false,
        '10': false
    },
    {
        '1': true,
        '2': false,
        '3': false,
        '4': true,
        '5': true,
        '6': false,
        '7': false,
        '8': true,
        '9': true,
        '10': true
    },
    {
        '1': false,
        '2': true,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': false,
        '8': false,
        '9': false,
        '10': true
    },
    {
        '1': true,
        '2': false,
        '3': true,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': true,
        '10': false
    },
    {
        '1': true,
        '2': true,
        '3': false,
        '4': false,
        '5': true,
        '6': true,
        '7': true,
        '8': false,
        '9': false,
        '10': true
    },
    {
        '1': false,
        '2': true,
        '3': false,
        '4': true,
        '5': false,
        '6': false,
        '7': true,
        '8': false,
        '9': true,
        '10': true
    },
    {
        '1': true,
        '2': true,
        '3': false,
        '4': true,
        '5': true,
        '6': false,
        '7': false,
        '8': true,
        '9': true,
        '10': true
    },
    {
        '1': false,
        '2': true,
        '3': false,
        '4': true,
        '5': true,
        '6': true,
        '7': true,
        '8': false,
        '9': false,
        '10': false
    },
    {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': true,
        '6': true,
        '7': true,
        '8': true,
        '9': false,
        '10': false
    },
    {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': true,
        '7': false,
        '8': false,
        '9': true,
        '10': false
    },
    {
        '1': false,
        '2': false,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': false,
        '8': false,
        '9': true,
        '10': true
    }
]
  

RANDOMTWO = [
    {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '7': true,
      '8': true,
      '9': false,
      '10': true
    },
    {
      '1': false,
      '2': true,
      '3': false,
      '4': false,
      '5': true,
      '6': false,
      '7': true,
      '8': true,
      '9': true,
      '10': true
    },
    {
      '1': true,
      '2': false,
      '3': false,
      '4': false,
      '5': true,
      '6': true,
      '7': false,
      '8': false,
      '9': true,
      '10': true
    },
    {
      '1': false,
      '2': true,
      '3': true,
      '4': false,
      '5': false,
      '6': true,
      '7': true,
      '8': true,
      '9': true,
      '10': true
    },
    {
      '1': true,
      '2': false,
      '3': false,
      '4': false,
      '5': true,
      '6': false,
      '7': false,
      '8': true,
      '9': false,
      '10': true
    },
    {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': true,
      '6': true,
      '7': false,
      '8': true,
      '9': true,
      '10': true
    },
    {
      '1': false,
      '2': true,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '7': true,
      '8': false,
      '9': true,
      '10': false
    },
    {
      '1': false,
      '2': true,
      '3': false,
      '4': true,
      '5': true,
      '6': false,
      '7': true,
      '8': true,
      '9': false,
      '10': true
    },
    {
      '1': false,
      '2': false,
      '3': false,
      '4': true,
      '5': false,
      '6': false,
      '7': true,
      '8': false,
      '9': false,
      '10': false
    },
    {
      '1': true,
      '2': false,
      '3': true,
      '4': true,
      '5': false,
      '6': true,
      '7': false,
      '8': false,
      '9': false,
      '10': false
    },
    {
      '1': true,
      '2': true,
      '3': false,
      '4': true,
      '5': true,
      '6': false,
      '7': true,
      '8': true,
      '9': true,
      '10': true
    },
    {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': true,
      '6': true,
      '7': true,
      '8': false,
      '9': true,
      '10': true
    },
    {
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': false,
      '6': true,
      '7': false,
      '8': false,
      '9': true,
      '10': true
    },
    {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': true,
      '6': false,
      '7': false,
      '8': true,
      '9': false,
      '10': false
    },
    {
      '1': true,
      '2': false,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': false,
      '8': true,
      '9': true,
      '10': true
    },
    {
      '1': true,
      '2': false,
      '3': false,
      '4': false,
      '5': true,
      '6': false,
      '7': false,
      '8': true,
      '9': true,
      '10': false
    },
    {
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': false,
      '6': false,
      '7': true,
      '8': false,
      '9': false,
      '10': true
    },
    {
      '1': false,
      '2': false,
      '3': true,
      '4': true,
      '5': true,
      '6': false,
      '7': false,
      '8': false,
      '9': true,
      '10': true
    },
    {
      '1': false,
      '2': true,
      '3': false,
      '4': true,
      '5': false,
      '6': true,
      '7': false,
      '8': false,
      '9': false,
      '10': false
    },
    {
      '1': true,
      '2': true,
      '3': true,
      '4': false,
      '5': true,
      '6': false,
      '7': false,
      '8': true,
      '9': true,
      '10': true
    }
]
  

module.exports = {
    STRIKE,
    SPAREONE,
    SPARETWO,
    ONEPIN,
    GUTTER,
    PERFECTGAME,
    SPAREGAME,
    SPARESTRIKE,
    STRIKESPARE,
    RANDOMONE,
    RANDOMTWO
}