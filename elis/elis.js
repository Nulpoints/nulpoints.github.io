if(typeof keyman === 'undefined') {
  console.log('Keyboard requires KeymanWeb 10.0 or later');
  if(typeof tavultesoft !== 'undefined') tavultesoft.keymanweb.util.alert("This keyboard requires KeymanWeb 10.0 or later");
} else {
KeymanWeb.KR(new Keyboard_elis());
}
function Keyboard_elis()
{
  var modCodes = keyman.osk.modifierCodes;
  var keyCodes = keyman.osk.keyCodes;

  this._v=(typeof keyman!="undefined"&&typeof keyman.version=="string")?parseInt(keyman.version,10):9;
  this.KI="Keyboard_elis";
  this.KN="Elis";
  this.KMINVER="10.0";
  this.KV={F:' 1em "Elis2"',K102:0};
  this.KV.KLS={
    "default": ["`","1","2","3","4","5","6","7","8","9","0","-","=","","","","q","w","e","r","t","y","u","i","o","p","[","]","\\","","","","a","s","d","f","g","h","j","k","l",";","'","","","","","","\\","z","x","c","v","b","n","m",",",".","/","","","","","",""],
    "shift": ["~","!","@","#","$","%","^","&","*","(",")","_","+","","","","Q","W","E","R","T","Y","U","I","O","P","{","}","|","","","","A","S","D","F","G","H","J","K","L",":","\"","","","","","","|","Z","X","C","V","B","N","M","<",">","?","","","","","",""],
    "leftctrl": ["`","1","2","3","4","5","6","7","8","9","0","-","=","","","","q","w","e","r","t","y","u","i","o","p","[","]","\\","","","","a","s","d","f","g","h","j","k","l",";","'","","","","","","\\","z","x","c","v","b","n","m",",",".","/","","","","","",""],
    "leftctrl-shift": ["~","!","@","#","$","%","^","&","*","(",")","_","+","","","","Q","W","E","R","T","Y","U","I","O","P","{","}","|","","","","A","S","D","F","G","H","J","K","L",":","\"","","","","","","|","Z","X","C","V","B","N","M","<",">","?","","","","","",""],
    "leftalt": ["","Í","Î","Ï","Ò","Ó","Ô","Õ","Ö","Ù","Ú","Û","Ü","","","","à","á","â","ã","ä","è","é","ê","ë","ì","í","»","¬","","","","î","ï","ò","ó","ô","õ","ö","ù","ú","É","Ê","","","","","","","û","ü","À","Á","Â","Ã","Ä","È","Ë","Ì","","","","","",""],
    "leftalt-shift": ["","¹","","","£","","","","","","","","÷","","","","Ä","Å","É","","Þ","Ü","Ú","Í","Ó","Ö","","","¦","","","","Á","§","Ð","","","","","","Ø","°","¨","","","","","","","Æ","","¢","","","Ñ","","Ç","","","","","","","",""],
    "leftctrl-leftalt": ["","¡","²","³","¤","€","¼","½","¾","‘","’","¥","×","","","","ä","å","é","®","þ","ü","ú","í","ó","ö","«","»","¬","","","","á","ß","ð","","","","","","ø","¶","´","","","","","","","æ","","©","","","ñ","µ","ç","","¿","","","","","",""],
    "leftctrl-leftalt-shift": ["","¹","","","£","","","","","","","","÷","","","","Ä","Å","É","","Þ","Ü","Ú","Í","Ó","Ö","","","¦","","","","Á","§","Ð","","","","","","Ø","°","¨","","","","","","","Æ","","¢","","","Ñ","","Ç","","","","","","","",""]
  };
  this.KV.BK=(function(x){
    var
      empty=Array.apply(null, Array(65)).map(String.prototype.valueOf,""),
      result=[], v, i,
      modifiers=['default','shift','ctrl','shift-ctrl','alt','shift-alt','ctrl-alt','shift-ctrl-alt'];
    for(i=modifiers.length-1;i>=0;i--) {
      v = x[modifiers[i]];
      if(v || result.length > 0) {
        result=(v ? v : empty).slice().concat(result);
      }
    }
    return result;
  })(this.KV.KLS);
  this.KDU=1;
  this.KH='';
  this.KM=0;
  this.KBVER="1.0";
  this.KMBM=modCodes.RALT /* 0x0008 */;
  this.KVKL={
  "tablet": {
    "font": "Elis2",
    "layer": [
      {
        "id": "default",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "K_Q",
                "text": "q"
              },
              {
                "id": "K_W",
                "text": "w"
              },
              {
                "id": "K_E",
                "text": "e",
                "sk": [
                  {
                    "id": "U_00E8"
                  },
                  {
                    "id": "U_00E9"
                  },
                  {
                    "id": "U_00EA"
                  },
                  {
                    "id": "U_00EB"
                  }
                ]
              },
              {
                "id": "K_R",
                "text": "r"
              },
              {
                "id": "K_T",
                "text": "t",
                "sk": [
                  {
                    "id": "U_00FE"
                  }
                ]
              },
              {
                "id": "K_Y",
                "text": "y",
                "sk": [
                  {
                    "id": "U_00FD"
                  }
                ]
              },
              {
                "id": "K_U",
                "text": "u",
                "sk": [
                  {
                    "id": "U_00F9"
                  },
                  {
                    "id": "U_00FA"
                  },
                  {
                    "id": "U_00FB"
                  },
                  {
                    "id": "U_00FC"
                  }
                ]
              },
              {
                "id": "K_I",
                "text": "i",
                "sk": [
                  {
                    "id": "U_00EC"
                  },
                  {
                    "id": "U_00ED"
                  },
                  {
                    "id": "U_00EE"
                  },
                  {
                    "id": "U_00EF"
                  }
                ]
              },
              {
                "id": "K_O",
                "text": "o",
                "sk": [
                  {
                    "id": "U_00F2"
                  },
                  {
                    "id": "U_00F3"
                  },
                  {
                    "id": "U_00F4"
                  },
                  {
                    "id": "U_00F5"
                  },
                  {
                    "id": "U_00F6"
                  },
                  {
                    "id": "U_00F8"
                  }
                ]
              },
              {
                "id": "K_P",
                "text": "p"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_A",
                "text": "a",
                "pad": "70",
                "sk": [
                  {
                    "id": "U_00E0"
                  },
                  {
                    "id": "U_00E1"
                  },
                  {
                    "id": "U_00E2"
                  },
                  {
                    "id": "U_00E3"
                  },
                  {
                    "id": "U_00E4"
                  }
                ]
              },
              {
                "id": "K_S",
                "text": "s"
              },
              {
                "id": "K_D",
                "text": "d"
              },
              {
                "id": "K_F",
                "text": "f"
              },
              {
                "id": "K_G",
                "text": "g"
              },
              {
                "id": "K_H",
                "text": "h"
              },
              {
                "id": "K_J",
                "text": "j"
              },
              {
                "id": "K_K",
                "text": "k"
              },
              {
                "id": "K_L",
                "text": "l"
              },
              {
                "id": "K_COMMA",
                "text": "ç"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_SHIFT",
                "text": "*Shift*",
                "width": "110",
                "sp": "1",
                "nextlayer": "shift"
              },
              {
                "id": "K_Z",
                "text": "z"
              },
              {
                "id": "K_X",
                "text": "x"
              },
              {
                "id": "K_C",
                "text": "c",
                "sk": [
                  {
                    "id": "U_00E7"
                  }
                ]
              },
              {
                "id": "K_V",
                "text": "v"
              },
              {
                "id": "K_B",
                "text": "b"
              },
              {
                "id": "K_N",
                "text": "n",
                "sk": [
                  {
                    "id": "U_00F1"
                  }
                ]
              },
              {
                "id": "K_M",
                "text": "m"
              },
              {
                "id": "K_PERIOD",
                "text": ".",
                "sk": [
                  {
                    "text": ",",
                    "id": "U_002C"
                  },
                  {
                    "text": "!",
                    "id": "U_0021"
                  },
                  {
                    "text": "?",
                    "id": "U_003F"
                  },
                  {
                    "text": "'",
                    "id": "U_0027"
                  },
                  {
                    "text": "\"",
                    "id": "U_0022"
                  },
                  {
                    "text": "\\",
                    "id": "U_005C"
                  },
                  {
                    "text": ":",
                    "id": "U_003A"
                  },
                  {
                    "text": ";",
                    "id": "U_003B"
                  }
                ]
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "4",
            "key": [
              {
                "id": "K_NUMLOCK",
                "text": "*123*",
                "width": "140",
                "sp": "1",
                "nextlayer": "numeric"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "630"
              },
              {
                "id": "U_00A7",
                "text": "§"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      },
      {
        "id": "shift",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "K_Q",
                "text": "Q"
              },
              {
                "id": "K_W",
                "text": "W"
              },
              {
                "id": "K_E",
                "text": "E",
                "sk": [
                  {
                    "text": "È",
                    "id": "U_00C8"
                  },
                  {
                    "text": "É",
                    "id": "U_00C9"
                  },
                  {
                    "text": "Ê",
                    "id": "U_00CA"
                  },
                  {
                    "text": "Ë",
                    "id": "U_00CB"
                  }
                ]
              },
              {
                "id": "K_R",
                "text": "R"
              },
              {
                "id": "K_T",
                "text": "T",
                "sk": [
                  {
                    "text": "Þ",
                    "id": "U_00DE"
                  }
                ]
              },
              {
                "id": "K_Y",
                "text": "Y",
                "sk": [
                  {
                    "text": "Ý",
                    "id": "U_00DD"
                  }
                ]
              },
              {
                "id": "K_U",
                "text": "U",
                "sk": [
                  {
                    "text": "Ù",
                    "id": "U_00D9"
                  },
                  {
                    "text": "Ú",
                    "id": "U_00DA"
                  },
                  {
                    "text": "Û",
                    "id": "U_00DB"
                  },
                  {
                    "text": "Ü",
                    "id": "U_00DC"
                  }
                ]
              },
              {
                "id": "K_I",
                "text": "I",
                "sk": [
                  {
                    "text": "Ì",
                    "id": "U_00CC"
                  },
                  {
                    "text": "Í",
                    "id": "U_00CD"
                  },
                  {
                    "text": "Î",
                    "id": "U_00CE"
                  },
                  {
                    "text": "Ï",
                    "id": "U_00CF"
                  }
                ]
              },
              {
                "id": "K_O",
                "text": "O",
                "sk": [
                  {
                    "text": "Ò",
                    "id": "U_00D2"
                  },
                  {
                    "text": "Ó",
                    "id": "U_00D3"
                  },
                  {
                    "text": "Ô",
                    "id": "U_00D4"
                  },
                  {
                    "text": "Õ",
                    "id": "U_00D5"
                  },
                  {
                    "text": "Ö",
                    "id": "U_00D6"
                  },
                  {
                    "text": "Ø",
                    "id": "U_00D8"
                  }
                ]
              },
              {
                "id": "K_P",
                "text": "P"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_A",
                "text": "A",
                "pad": "70",
                "sk": [
                  {
                    "text": "À",
                    "id": "U_00C0"
                  },
                  {
                    "text": "Á",
                    "id": "U_00C1"
                  },
                  {
                    "text": "Â",
                    "id": "U_00C2"
                  },
                  {
                    "text": "Ã",
                    "id": "U_00C3"
                  },
                  {
                    "text": "Ä",
                    "id": "U_00C4"
                  },
                  {
                    "text": "Å",
                    "id": "U_00C5"
                  },
                  {
                    "text": "Æ",
                    "id": "U_00C6"
                  }
                ]
              },
              {
                "id": "K_S",
                "text": "S"
              },
              {
                "id": "K_D",
                "text": "D",
                "sk": [
                  {
                    "text": "Ð",
                    "id": "U_00D0"
                  }
                ]
              },
              {
                "id": "K_F",
                "text": "F"
              },
              {
                "id": "K_G",
                "text": "G"
              },
              {
                "id": "K_H",
                "text": "H"
              },
              {
                "id": "K_J",
                "text": "J"
              },
              {
                "id": "K_K",
                "text": "K"
              },
              {
                "id": "K_L",
                "text": "L"
              },
              {
                "id": "K_COLON",
                "text": "Ç"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_SHIFT",
                "text": "*Shift*",
                "width": "110",
                "sp": "2",
                "nextlayer": "default"
              },
              {
                "id": "K_Z",
                "text": "Z"
              },
              {
                "id": "K_X",
                "text": "X"
              },
              {
                "id": "K_C",
                "text": "C",
                "sk": [
                  {
                    "text": "Ç",
                    "id": "U_00C7"
                  }
                ]
              },
              {
                "id": "K_V",
                "text": "V"
              },
              {
                "id": "K_B",
                "text": "B"
              },
              {
                "id": "K_N",
                "text": "N",
                "sk": [
                  {
                    "text": "Ñ",
                    "id": "U_00D1"
                  }
                ]
              },
              {
                "id": "K_M",
                "text": "M"
              },
              {
                "id": "K_PERIOD",
                "text": ".",
                "sk": [
                  {
                    "text": ",",
                    "id": "U_002C"
                  },
                  {
                    "text": "!",
                    "id": "U_0021"
                  },
                  {
                    "text": "?",
                    "id": "U_003F"
                  },
                  {
                    "text": "'",
                    "id": "U_0027"
                  },
                  {
                    "text": "\"",
                    "id": "U_0022"
                  },
                  {
                    "text": "\\",
                    "id": "U_005C"
                  },
                  {
                    "text": ":",
                    "id": "U_003A"
                  },
                  {
                    "text": ";",
                    "id": "U_003B"
                  }
                ]
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "4",
            "key": [
              {
                "id": "K_NUMLOCK",
                "text": "*123*",
                "width": "140",
                "sp": "1",
                "nextlayer": "numeric"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "630"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      },
      {
        "id": "numeric",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "K_1",
                "text": "1"
              },
              {
                "id": "K_2",
                "text": "2"
              },
              {
                "id": "K_3",
                "text": "3"
              },
              {
                "id": "K_4",
                "text": "4"
              },
              {
                "id": "K_5",
                "text": "5"
              },
              {
                "id": "K_6",
                "text": "6"
              },
              {
                "id": "K_7",
                "text": "7"
              },
              {
                "id": "K_8",
                "text": "8"
              },
              {
                "id": "K_9",
                "text": "9"
              },
              {
                "id": "K_0",
                "text": "0"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_4",
                "text": "$",
                "pad": "70",
                "layer": "shift"
              },
              {
                "id": "K_2",
                "text": "@",
                "layer": "shift"
              },
              {
                "id": "K_3",
                "text": "#",
                "layer": "shift"
              },
              {
                "id": "K_5",
                "text": "%",
                "layer": "shift"
              },
              {
                "id": "K_7",
                "text": "&",
                "layer": "shift"
              },
              {
                "id": "K_HYPHEN",
                "text": "_",
                "layer": "shift"
              },
              {
                "id": "K_EQUAL",
                "text": "=",
                "layer": "default"
              },
              {
                "id": "K_BKSLASH",
                "text": "|",
                "layer": "shift"
              },
              {
                "id": "K_BKSLASH",
                "text": "\\",
                "layer": "default"
              },
              {
                "id": "T_new_866",
                "width": "10",
                "sp": "10"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_SYMBOLS",
                "text": "§",
                "width": "110",
                "sp": "1",
                "nextlayer": "symbol"
              },
              {
                "id": "K_LBRKT",
                "text": "[",
                "sk": [
                  {
                    "id": "U_00AB",
                    "text": "«"
                  },
                  {
                    "id": "U_003C",
                    "text": "<"
                  },
                  {
                    "id": "U_007B",
                    "text": "{"
                  }
                ]
              },
              {
                "id": "K_9",
                "text": "(",
                "layer": "shift"
              },
              {
                "id": "K_0",
                "text": ")",
                "layer": "shift"
              },
              {
                "id": "K_RBRKT",
                "text": "]",
                "sk": [
                  {
                    "id": "U_00BB",
                    "text": "»"
                  },
                  {
                    "id": "U_003E",
                    "text": ">"
                  },
                  {
                    "id": "U_007D",
                    "text": "}"
                  }
                ]
              },
              {
                "id": "K_EQUAL",
                "text": "+",
                "layer": "shift"
              },
              {
                "id": "K_HYPHEN",
                "text": "-",
                "layer": "default"
              },
              {
                "id": "K_8",
                "text": "*",
                "layer": "shift"
              },
              {
                "id": "K_SLASH",
                "text": "/",
                "layer": "default"
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "4",
            "key": [
              {
                "id": "K_LOWER",
                "text": "*abc*",
                "width": "140",
                "sp": "1",
                "nextlayer": "default"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "630"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      },
      {
        "id": "symbol",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "U_0060",
                "text": "à",
                "sk": [
                  {
                    "text": "à",
                    "id": "U_00E0"
                  },
                  {
                    "text": "á",
                    "id": "U_00E1"
                  },
                  {
                    "text": "â",
                    "id": "U_00E2"
                  }
                ]
              },
              {
                "id": "U_00A8",
                "text": "ã",
                "sk": [
                  {
                    "text": "ã",
                    "id": "U_00E3"
                  },
                  {
                    "text": "ä",
                    "id": "U_00E4"
                  },
                  {
                    "text": "è",
                    "id": "U_00E8"
                  },
                  {
                    "text": "é",
                    "id": "U_00E9"
                  },
                  {
                    "text": "ê",
                    "id": "U_00EA"
                  },
                  {
                    "text": "ë",
                    "id": "U_00EB"
                  }
                ]
              },
              {
                "id": "U_00AC",
                "text": "ì",
                "sk": [
                  {
                    "text": "ì",
                    "id": "U_00EC"
                  },
                  {
                    "text": "í",
                    "id": "U_00ED"
                  }
                ]
              },
              {
                "id": "U_00BA",
                "text": "î",
                "sk": [
                  {
                    "text": "î",
                    "id": "U_00EE"
                  },
                  {
                    "text": "ï",
                    "id": "U_00EF"
                  },
                  {
                    "text": "ò",
                    "id": "U_00F2"
                  },
                  {
                    "text": "ó",
                    "id": "U_00F3"
                  }
                ]
              },
              {
                "id": "U_00D7",
                "text": "ô",
                "sk": [
                  {
                    "text": "ô",
                    "id": "U_00F4"
                  },
                  {
                    "text": "õ",
                    "id": "U_00F5"
                  },
                  {
                    "text": "ö",
                    "id": "U_00F6"
                  },
                  {
                    "text": "ù",
                    "id": "U_00F9"
                  },
                  {
                    "text": "ú",
                    "id": "U_00FA"
                  }
                ]
              },
              {
                "id": "U_00A7",
                "text": "|"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_NUMLOCK",
                "text": "*123*",
                "width": "110",
                "sp": "1",
                "nextlayer": "numeric"
              },
              {
                "id": "U_00FB",
                "text": "û",
                "sk": [
                  {
                    "text": "û",
                    "id": "U_00FB"
                  },
                  {
                    "text": "ü",
                    "id": "U_00FC"
                  },
                  {
                    "text": "À",
                    "id": "U_00C0"
                  },
                  {
                    "text": "Á",
                    "id": "U_00C1"
                  },
                  {
                    "text": "Â",
                    "id": "U_00C2"
                  },
                  {
                    "text": "Ã",
                    "id": "U_00C3"
                  }
                ]
              },
              {
                "id": "U_00C4",
                "text": "Ä",
                "sk": [
                  {
                    "text": "Ä",
                    "id": "U_00C4"
                  },
                  {
                    "text": "È",
                    "id": "U_00C8"
                  },
                  {
                    "text": "É",
                    "id": "U_00C9"
                  },
                  {
                    "text": "Ê",
                    "id": "U_00CA"
                  },
                  {
                    "text": "Ë",
                    "id": "U_00CB"
                  },
                  {
                    "text": "Ì",
                    "id": "U_00CC"
                  }
                ]
              },
              {
                "id": "U_00CD",
                "text": "Í",
                "sk": [
                  {
                    "text": "Í",
                    "id": "U_00CD"
                  },
                  {
                    "text": "Î",
                    "id": "U_00CE"
                  },
                  {
                    "text": "Ï",
                    "id": "U_00CF"
                  },
                  {
                    "text": "Ò",
                    "id": "U_00D2"
                  },
                  {
                    "text": "Ó",
                    "id": "U_00D3"
                  },
                  {
                    "text": "Ô",
                    "id": "U_00D4"
                  }
                ]
              },
              {
                "id": "U_00D5",
                "text": "Õ",
                "sk": [
                  {
                    "text": "Õ",
                    "id": "U_00D5"
                  },
                  {
                    "text": "Ö",
                    "id": "U_00D6"
                  },
                  {
                    "text": "Ù",
                    "id": "U_00D9"
                  },
                  {
                    "text": "Ú",
                    "id": "U_00DA"
                  },
                  {
                    "text": "Û",
                    "id": "U_00DB"
                  },
                  {
                    "text": "Ü",
                    "id": "U_00DC"
                  }
                ]
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_LOWER",
                "text": "*abc*",
                "width": "140",
                "sp": "1",
                "nextlayer": "default"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "159"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      }
    ],
    "displayUnderlying": false
  },
  "phone": {
    "font": "Elis2",
    "layer": [
      {
        "id": "default",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "K_Q",
                "text": "q"
              },
              {
                "id": "K_W",
                "text": "w"
              },
              {
                "id": "K_E",
                "text": "e",
                "sk": [
                  {
                    "id": "U_00E8"
                  },
                  {
                    "id": "U_00E9"
                  },
                  {
                    "id": "U_00EA"
                  },
                  {
                    "id": "U_00EB"
                  }
                ]
              },
              {
                "id": "K_R",
                "text": "r"
              },
              {
                "id": "K_T",
                "text": "t",
                "sk": [
                  {
                    "id": "U_00FE"
                  }
                ]
              },
              {
                "id": "K_Y",
                "text": "y",
                "sk": [
                  {
                    "id": "U_00FD"
                  }
                ]
              },
              {
                "id": "K_U",
                "text": "u",
                "sk": [
                  {
                    "id": "U_00F9"
                  },
                  {
                    "id": "U_00FA"
                  },
                  {
                    "id": "U_00FB"
                  },
                  {
                    "id": "U_00FC"
                  }
                ]
              },
              {
                "id": "K_I",
                "text": "i",
                "sk": [
                  {
                    "id": "U_00EC"
                  },
                  {
                    "id": "U_00ED"
                  },
                  {
                    "id": "U_00EE"
                  },
                  {
                    "id": "U_00EF"
                  }
                ]
              },
              {
                "id": "K_O",
                "text": "o",
                "sk": [
                  {
                    "id": "U_00F2"
                  },
                  {
                    "id": "U_00F3"
                  },
                  {
                    "id": "U_00F4"
                  },
                  {
                    "id": "U_00F5"
                  },
                  {
                    "id": "U_00F6"
                  },
                  {
                    "id": "U_00F8"
                  }
                ]
              },
              {
                "id": "K_P",
                "text": "p"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_A",
                "text": "a",
                "pad": "50",
                "sk": [
                  {
                    "id": "U_00E0"
                  },
                  {
                    "id": "U_00E1"
                  },
                  {
                    "id": "U_00E2"
                  },
                  {
                    "id": "U_00E3"
                  },
                  {
                    "id": "U_00E4"
                  }
                ]
              },
              {
                "id": "K_S",
                "text": "s",
                "sk": [
                  {
                    "id": "U_00DF"
                  }
                ]
              },
              {
                "id": "K_D",
                "text": "d",
                "sk": [
                  {
                    "id": "U_00F0"
                  }
                ]
              },
              {
                "id": "K_F",
                "text": "f"
              },
              {
                "id": "K_G",
                "text": "g"
              },
              {
                "id": "K_H",
                "text": "h"
              },
              {
                "id": "K_J",
                "text": "j"
              },
              {
                "id": "K_K",
                "text": "k"
              },
              {
                "id": "K_L",
                "text": "l"
              },
              {
                "id": "U_00E7",
                "text": "ç"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_SHIFT",
                "text": "*Shift*",
                "width": "110",
                "sp": "1",
                "nextlayer": "shift"
              },
              {
                "id": "K_Z",
                "text": "z"
              },
              {
                "id": "K_X",
                "text": "x"
              },
              {
                "id": "K_C",
                "text": "c",
                "sk": [
                  {
                    "id": "U_00E7"
                  }
                ]
              },
              {
                "id": "K_V",
                "text": "v"
              },
              {
                "id": "K_B",
                "text": "b"
              },
              {
                "id": "K_N",
                "text": "n",
                "sk": [
                  {
                    "id": "U_00F1"
                  }
                ]
              },
              {
                "id": "K_M",
                "text": "m"
              },
              {
                "id": "K_PERIOD",
                "text": ".",
                "sk": [
                  {
                    "text": ",",
                    "id": "U_002C"
                  },
                  {
                    "text": "!",
                    "id": "U_0021"
                  },
                  {
                    "text": "?",
                    "id": "U_003F"
                  },
                  {
                    "text": "'",
                    "id": "U_0027"
                  },
                  {
                    "text": "\"",
                    "id": "U_0022"
                  },
                  {
                    "text": "\\",
                    "id": "U_005C"
                  },
                  {
                    "text": ":",
                    "id": "U_003A"
                  },
                  {
                    "text": ";",
                    "id": "U_003B"
                  }
                ]
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "4",
            "key": [
              {
                "id": "K_NUMLOCK",
                "text": "*123*",
                "width": "140",
                "sp": "1",
                "nextlayer": "numeric"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "630"
              },
              {
                "id": "U_00A7",
                "text": "|"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      },
      {
        "id": "shift",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "K_Q",
                "text": "Q"
              },
              {
                "id": "K_W",
                "text": "W"
              },
              {
                "id": "K_E",
                "text": "E",
                "sk": [
                  {
                    "text": "È",
                    "id": "U_00C8"
                  },
                  {
                    "text": "É",
                    "id": "U_00C9"
                  },
                  {
                    "text": "Ê",
                    "id": "U_00CA"
                  },
                  {
                    "text": "Ë",
                    "id": "U_00CB"
                  }
                ]
              },
              {
                "id": "K_R",
                "text": "R"
              },
              {
                "id": "K_T",
                "text": "T",
                "sk": [
                  {
                    "text": "Þ",
                    "id": "U_00DE"
                  }
                ]
              },
              {
                "id": "K_Y",
                "text": "Y",
                "sk": [
                  {
                    "text": "Ý",
                    "id": "U_00DD"
                  }
                ]
              },
              {
                "id": "K_U",
                "text": "U",
                "sk": [
                  {
                    "text": "Ù",
                    "id": "U_00D9"
                  },
                  {
                    "text": "Ú",
                    "id": "U_00DA"
                  },
                  {
                    "text": "Û",
                    "id": "U_00DB"
                  },
                  {
                    "text": "Ü",
                    "id": "U_00DC"
                  }
                ]
              },
              {
                "id": "K_I",
                "text": "I",
                "sk": [
                  {
                    "text": "Ì",
                    "id": "U_00CC"
                  },
                  {
                    "text": "Í",
                    "id": "U_00CD"
                  },
                  {
                    "text": "Î",
                    "id": "U_00CE"
                  },
                  {
                    "text": "Ï",
                    "id": "U_00CF"
                  }
                ]
              },
              {
                "id": "K_O",
                "text": "O",
                "sk": [
                  {
                    "text": "Ò",
                    "id": "U_00D2"
                  },
                  {
                    "text": "Ó",
                    "id": "U_00D3"
                  },
                  {
                    "text": "Ô",
                    "id": "U_00D4"
                  },
                  {
                    "text": "Õ",
                    "id": "U_00D5"
                  },
                  {
                    "text": "Ö",
                    "id": "U_00D6"
                  },
                  {
                    "text": "Ø",
                    "id": "U_00D8"
                  }
                ]
              },
              {
                "id": "K_P",
                "text": "P"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_A",
                "text": "A",
                "pad": "50",
                "sk": [
                  {
                    "text": "À",
                    "id": "U_00C0"
                  },
                  {
                    "text": "Á",
                    "id": "U_00C1"
                  },
                  {
                    "text": "Â",
                    "id": "U_00C2"
                  },
                  {
                    "text": "Ã",
                    "id": "U_00C3"
                  },
                  {
                    "text": "Ä",
                    "id": "U_00C4"
                  },
                  {
                    "text": "Å",
                    "id": "U_00C5"
                  },
                  {
                    "text": "Æ",
                    "id": "U_00C6"
                  }
                ]
              },
              {
                "id": "K_S",
                "text": "S"
              },
              {
                "id": "K_D",
                "text": "D",
                "sk": [
                  {
                    "text": "Ð",
                    "id": "U_00D0"
                  }
                ]
              },
              {
                "id": "K_F",
                "text": "F"
              },
              {
                "id": "K_G",
                "text": "G"
              },
              {
                "id": "K_H",
                "text": "H"
              },
              {
                "id": "K_J",
                "text": "J"
              },
              {
                "id": "K_K",
                "text": "K"
              },
              {
                "id": "K_L",
                "text": "L"
              },
              {
                "id": "U_00C7",
                "text": "Ç"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_SHIFT",
                "text": "*Shift*",
                "width": "110",
                "sp": "2",
                "nextlayer": "default"
              },
              {
                "id": "K_Z",
                "text": "Z"
              },
              {
                "id": "K_X",
                "text": "X"
              },
              {
                "id": "K_C",
                "text": "C",
                "sk": [
                  {
                    "text": "Ç",
                    "id": "U_00C7"
                  }
                ]
              },
              {
                "id": "K_V",
                "text": "V"
              },
              {
                "id": "K_B",
                "text": "B"
              },
              {
                "id": "K_N",
                "text": "N",
                "sk": [
                  {
                    "text": "Ñ",
                    "id": "U_00D1"
                  }
                ]
              },
              {
                "id": "K_M",
                "text": "M"
              },
              {
                "id": "K_PERIOD",
                "text": ".",
                "sk": [
                  {
                    "text": ",",
                    "id": "U_002C"
                  },
                  {
                    "text": "!",
                    "id": "U_0021"
                  },
                  {
                    "text": "?",
                    "id": "U_003F"
                  },
                  {
                    "text": "'",
                    "id": "U_0027"
                  },
                  {
                    "text": "\"",
                    "id": "U_0022"
                  },
                  {
                    "text": "\\",
                    "id": "U_005C"
                  },
                  {
                    "text": ":",
                    "id": "U_003A"
                  },
                  {
                    "text": ";",
                    "id": "U_003B"
                  }
                ]
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "4",
            "key": [
              {
                "id": "K_NUMLOCK",
                "text": "*123*",
                "width": "140",
                "sp": "1",
                "nextlayer": "numeric"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "630"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      },
      {
        "id": "numeric",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "K_1",
                "text": "1"
              },
              {
                "id": "K_2",
                "text": "2"
              },
              {
                "id": "K_3",
                "text": "3"
              },
              {
                "id": "K_4",
                "text": "4"
              },
              {
                "id": "K_5",
                "text": "5"
              },
              {
                "id": "K_6",
                "text": "6"
              },
              {
                "id": "K_7",
                "text": "7"
              },
              {
                "id": "K_8",
                "text": "8"
              },
              {
                "id": "K_9",
                "text": "9"
              },
              {
                "id": "K_0",
                "text": "0"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_4",
                "text": "$",
                "pad": "50",
                "layer": "shift"
              },
              {
                "id": "K_2",
                "text": "@",
                "layer": "shift"
              },
              {
                "id": "K_3",
                "text": "#",
                "layer": "shift"
              },
              {
                "id": "K_5",
                "text": "%",
                "layer": "shift"
              },
              {
                "id": "K_7",
                "text": "&",
                "layer": "shift"
              },
              {
                "id": "K_HYPHEN",
                "text": "_",
                "layer": "shift"
              },
              {
                "id": "K_EQUAL",
                "text": "=",
                "layer": "default"
              },
              {
                "id": "K_BKSLASH",
                "text": "|",
                "layer": "shift"
              },
              {
                "id": "K_BKSLASH",
                "text": "\\",
                "layer": "default"
              },
              {
                "id": "T_new_258",
                "width": "10",
                "sp": "10"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_SYMBOLS",
                "text": "§",
                "width": "110",
                "sp": "1",
                "nextlayer": "symbol"
              },
              {
                "id": "K_LBRKT",
                "text": "[",
                "sk": [
                  {
                    "id": "U_00AB",
                    "text": "«"
                  },
                  {
                    "id": "U_003C",
                    "text": "<"
                  },
                  {
                    "id": "U_007B",
                    "text": "{"
                  }
                ]
              },
              {
                "id": "K_9",
                "text": "(",
                "layer": "shift"
              },
              {
                "id": "K_0",
                "text": ")",
                "layer": "shift"
              },
              {
                "id": "K_RBRKT",
                "text": "]",
                "sk": [
                  {
                    "id": "U_00BB",
                    "text": "»"
                  },
                  {
                    "id": "U_003E",
                    "text": ">"
                  },
                  {
                    "id": "U_007D",
                    "text": "}"
                  }
                ]
              },
              {
                "id": "K_EQUAL",
                "text": "+",
                "layer": "shift"
              },
              {
                "id": "K_HYPHEN",
                "text": "-",
                "layer": "default"
              },
              {
                "id": "K_8",
                "text": "*",
                "layer": "shift"
              },
              {
                "id": "K_SLASH",
                "text": "/",
                "layer": "default"
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "4",
            "key": [
              {
                "id": "K_LOWER",
                "text": "*abc*",
                "width": "140",
                "sp": "1",
                "nextlayer": "default"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "630"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      },
      {
        "id": "symbol",
        "row": [
          {
            "id": "1",
            "key": [
              {
                "id": "U_0060",
                "text": "à",
                "sk": [
                  {
                    "text": "à",
                    "id": "U_00E0"
                  },
                  {
                    "text": "á",
                    "id": "U_00E1"
                  },
                  {
                    "text": "â",
                    "id": "U_00E2"
                  }
                ]
              },
              {
                "id": "U_00A8",
                "text": "ã",
                "sk": [
                  {
                    "text": "ã",
                    "id": "U_00E3"
                  },
                  {
                    "text": "ä",
                    "id": "U_00E4"
                  },
                  {
                    "text": "è",
                    "id": "U_00E8"
                  },
                  {
                    "text": "é",
                    "id": "U_00E9"
                  },
                  {
                    "text": "ê",
                    "id": "U_00EA"
                  },
                  {
                    "text": "ë",
                    "id": "U_00EB"
                  }
                ]
              },
              {
                "id": "U_00AC",
                "text": "ì",
                "sk": [
                  {
                    "text": "ì",
                    "id": "U_00EC"
                  },
                  {
                    "text": "í",
                    "id": "U_00ED"
                  }
                ]
              },
              {
                "id": "U_00BA",
                "text": "î",
                "sk": [
                  {
                    "text": "î",
                    "id": "U_00EE"
                  },
                  {
                    "text": "ï",
                    "id": "U_00EF"
                  },
                  {
                    "text": "ò",
                    "id": "U_00F2"
                  },
                  {
                    "text": "ó",
                    "id": "U_00F3"
                  }
                ]
              },
              {
                "id": "U_00D7",
                "text": "ô",
                "sk": [
                  {
                    "text": "ô",
                    "id": "U_00F4"
                  },
                  {
                    "text": "õ",
                    "id": "U_00F5"
                  },
                  {
                    "text": "ö",
                    "id": "U_00F6"
                  },
                  {
                    "text": "ù",
                    "id": "U_00F9"
                  },
                  {
                    "text": "ú",
                    "id": "U_00FA"
                  }
                ]
              },
              {
                "id": "U_00A7",
                "text": "§"
              }
            ]
          },
          {
            "id": "2",
            "key": [
              {
                "id": "K_NUMLOCK",
                "text": "*123*",
                "width": "110",
                "sp": "1",
                "nextlayer": "numeric"
              },
              {
                "id": "U_00FB",
                "text": "û",
                "sk": [
                  {
                    "text": "û",
                    "id": "U_00FB"
                  },
                  {
                    "text": "ü",
                    "id": "U_00FC"
                  },
                  {
                    "text": "À",
                    "id": "U_00C0"
                  },
                  {
                    "text": "Á",
                    "id": "U_00C1"
                  },
                  {
                    "text": "Â",
                    "id": "U_00C2"
                  },
                  {
                    "text": "Ã",
                    "id": "U_00C3"
                  }
                ]
              },
              {
                "id": "U_00C4",
                "text": "Ä",
                "sk": [
                  {
                    "text": "Ä",
                    "id": "U_00C4"
                  },
                  {
                    "text": "È",
                    "id": "U_00C8"
                  },
                  {
                    "text": "É",
                    "id": "U_00C9"
                  },
                  {
                    "text": "Ê",
                    "id": "U_00CA"
                  },
                  {
                    "text": "Ë",
                    "id": "U_00CB"
                  },
                  {
                    "text": "Ì",
                    "id": "U_00CC"
                  }
                ]
              },
              {
                "id": "U_00CD",
                "text": "Í",
                "sk": [
                  {
                    "text": "Í",
                    "id": "U_00CD"
                  },
                  {
                    "text": "Î",
                    "id": "U_00CE"
                  },
                  {
                    "text": "Ï",
                    "id": "U_00CF"
                  },
                  {
                    "text": "Ò",
                    "id": "U_00D2"
                  },
                  {
                    "text": "Ó",
                    "id": "U_00D3"
                  },
                  {
                    "text": "Ô",
                    "id": "U_00D4"
                  }
                ]
              },
              {
                "id": "U_00D5",
                "text": "Õ",
                "sk": [
                  {
                    "text": "Õ",
                    "id": "U_00D5"
                  },
                  {
                    "text": "Ö",
                    "id": "U_00D6"
                  },
                  {
                    "text": "Ù",
                    "id": "U_00D9"
                  },
                  {
                    "text": "Ú",
                    "id": "U_00DA"
                  },
                  {
                    "text": "Û",
                    "id": "U_00DB"
                  },
                  {
                    "text": "Ü",
                    "id": "U_00DC"
                  }
                ]
              },
              {
                "id": "K_BKSP",
                "text": "*BkSp*",
                "width": "90",
                "sp": "1"
              }
            ]
          },
          {
            "id": "3",
            "key": [
              {
                "id": "K_LOWER",
                "text": "*abc*",
                "width": "140",
                "sp": "1",
                "nextlayer": "default"
              },
              {
                "id": "K_LOPT",
                "text": "*Menu*",
                "width": "120",
                "sp": "1"
              },
              {
                "id": "K_SPACE",
                "width": "159"
              },
              {
                "id": "K_ENTER",
                "text": "*Enter*",
                "width": "140",
                "sp": "1"
              }
            ]
          }
        ]
      }
    ],
    "displayUnderlying": false
  }
};
  this.KVER="18.0.235.0";
  this.KVS=[];
  this.gs=function(t,e) {
    return this.g_main_0(t,e);
  };
  this.gs=function(t,e) {
    return this.g_main_0(t,e);
  };
  this.g_main_0=function(t,e) {
    var k=KeymanWeb,r=0,m=0;
    if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_EQUAL /* 0xBB */)) {
      if(1){
        r=m=1;   // Line 15
        k.KDC(0,t);
        k.KO(-1,t,"Ü");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_HYPHEN /* 0xBD */)) {
      if(1){
        r=m=1;   // Line 16
        k.KDC(0,t);
        k.KO(-1,t,"Û");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_0 /* 0x30 */)) {
      if(1){
        r=m=1;   // Line 17
        k.KDC(0,t);
        k.KO(-1,t,"Ú");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_9 /* 0x39 */)) {
      if(1){
        r=m=1;   // Line 18
        k.KDC(0,t);
        k.KO(-1,t,"Ù");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_8 /* 0x38 */)) {
      if(1){
        r=m=1;   // Line 19
        k.KDC(0,t);
        k.KO(-1,t,"Ö");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_7 /* 0x37 */)) {
      if(1){
        r=m=1;   // Line 20
        k.KDC(0,t);
        k.KO(-1,t,"Õ");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_6 /* 0x36 */)) {
      if(1){
        r=m=1;   // Line 21
        k.KDC(0,t);
        k.KO(-1,t,"Ô");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_5 /* 0x35 */)) {
      if(1){
        r=m=1;   // Line 22
        k.KDC(0,t);
        k.KO(-1,t,"Ó");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_4 /* 0x34 */)) {
      if(1){
        r=m=1;   // Line 23
        k.KDC(0,t);
        k.KO(-1,t,"Ò");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_3 /* 0x33 */)) {
      if(1){
        r=m=1;   // Line 24
        k.KDC(0,t);
        k.KO(-1,t,"Ï");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_2 /* 0x32 */)) {
      if(1){
        r=m=1;   // Line 25
        k.KDC(0,t);
        k.KO(-1,t,"Î");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_1 /* 0x31 */)) {
      if(1){
        r=m=1;   // Line 26
        k.KDC(0,t);
        k.KO(-1,t,"Í");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_SLASH /* 0xBF */)) {
      if(1){
        r=m=1;   // Line 27
        k.KDC(0,t);
        k.KO(-1,t,"Ì");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_PERIOD /* 0xBE */)) {
      if(1){
        r=m=1;   // Line 28
        k.KDC(0,t);
        k.KO(-1,t,"Ë");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_QUOTE /* 0xDE */)) {
      if(1){
        r=m=1;   // Line 29
        k.KDC(0,t);
        k.KO(-1,t,"Ê");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_COLON /* 0xBA */)) {
      if(1){
        r=m=1;   // Line 30
        k.KDC(0,t);
        k.KO(-1,t,"É");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_COMMA /* 0xBC */)) {
      if(1){
        r=m=1;   // Line 31
        k.KDC(0,t);
        k.KO(-1,t,"È");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_M /* 0x4D */)) {
      if(1){
        r=m=1;   // Line 32
        k.KDC(0,t);
        k.KO(-1,t,"Ä");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_N /* 0x4E */)) {
      if(1){
        r=m=1;   // Line 33
        k.KDC(0,t);
        k.KO(-1,t,"Ã");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_B /* 0x42 */)) {
      if(1){
        r=m=1;   // Line 34
        k.KDC(0,t);
        k.KO(-1,t,"Â");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_V /* 0x56 */)) {
      if(1){
        r=m=1;   // Line 35
        k.KDC(0,t);
        k.KO(-1,t,"Á");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_C /* 0x43 */)) {
      if(1){
        r=m=1;   // Line 36
        k.KDC(0,t);
        k.KO(-1,t,"À");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_X /* 0x58 */)) {
      if(1){
        r=m=1;   // Line 37
        k.KDC(0,t);
        k.KO(-1,t,"ü");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_L /* 0x4C */)) {
      if(1){
        r=m=1;   // Line 38
        k.KDC(0,t);
        k.KO(-1,t,"ú");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_K /* 0x4B */)) {
      if(1){
        r=m=1;   // Line 39
        k.KDC(0,t);
        k.KO(-1,t,"ù");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_J /* 0x4A */)) {
      if(1){
        r=m=1;   // Line 40
        k.KDC(0,t);
        k.KO(-1,t,"ö");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_H /* 0x48 */)) {
      if(1){
        r=m=1;   // Line 41
        k.KDC(0,t);
        k.KO(-1,t,"õ");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_G /* 0x47 */)) {
      if(1){
        r=m=1;   // Line 42
        k.KDC(0,t);
        k.KO(-1,t,"ô");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_F /* 0x46 */)) {
      if(1){
        r=m=1;   // Line 43
        k.KDC(0,t);
        k.KO(-1,t,"ó");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_D /* 0x44 */)) {
      if(1){
        r=m=1;   // Line 44
        k.KDC(0,t);
        k.KO(-1,t,"ò");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_S /* 0x53 */)) {
      if(1){
        r=m=1;   // Line 45
        k.KDC(0,t);
        k.KO(-1,t,"ï");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_A /* 0x41 */)) {
      if(1){
        r=m=1;   // Line 46
        k.KDC(0,t);
        k.KO(-1,t,"î");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_Z /* 0x5A */)) {
      if(1){
        r=m=1;   // Line 47
        k.KDC(0,t);
        k.KO(-1,t,"û");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_LBRKT /* 0xDB */)) {
      if(1){
        r=m=1;   // Line 48
        k.KDC(0,t);
        k.KO(-1,t,"í");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_P /* 0x50 */)) {
      if(1){
        r=m=1;   // Line 49
        k.KDC(0,t);
        k.KO(-1,t,"ì");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_O /* 0x4F */)) {
      if(1){
        r=m=1;   // Line 50
        k.KDC(0,t);
        k.KO(-1,t,"ë");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_I /* 0x49 */)) {
      if(1){
        r=m=1;   // Line 51
        k.KDC(0,t);
        k.KO(-1,t,"ê");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_U /* 0x55 */)) {
      if(1){
        r=m=1;   // Line 52
        k.KDC(0,t);
        k.KO(-1,t,"é");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_Y /* 0x59 */)) {
      if(1){
        r=m=1;   // Line 53
        k.KDC(0,t);
        k.KO(-1,t,"è");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_T /* 0x54 */)) {
      if(1){
        r=m=1;   // Line 54
        k.KDC(0,t);
        k.KO(-1,t,"ä");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_R /* 0x52 */)) {
      if(1){
        r=m=1;   // Line 55
        k.KDC(0,t);
        k.KO(-1,t,"ã");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_E /* 0x45 */)) {
      if(1){
        r=m=1;   // Line 56
        k.KDC(0,t);
        k.KO(-1,t,"â");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_W /* 0x57 */)) {
      if(1){
        r=m=1;   // Line 57
        k.KDC(0,t);
        k.KO(-1,t,"á");
      }
    }
    else if(k.KKM(e, modCodes.RALT | modCodes.VIRTUAL_KEY /* 0x4008 */, keyCodes.K_Q /* 0x51 */)) {
      if(1){
        r=m=1;   // Line 58
        k.KDC(0,t);
        k.KO(-1,t,"à");
      }
    }
    else if(k.KKM(e, modCodes.VIRTUAL_KEY /* 0x4000 */, keyCodes.K_C /* 0x43 */)) {
      if(k.KFCM(1,t,['\''])){
        r=m=1;   // Line 59
        k.KDC(1,t);
        k.KO(-1,t,"ç");
      }
    }
    return r;
  };
}
