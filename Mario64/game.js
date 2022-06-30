kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,255, 1]
});

let isJumping = true;
let isBig = false;

loadRoot("https://i.imgur.com/");

loadSprite('goomba', 'KPO3fR9.png') ;
loadSprite('surpresa', 'gesQ1KP.png');
loadSprite('unboxed', 'bdrLpi6.png');
loadSprite('moeda', 'wbKxhcd.png');
loadSprite('cogumelo', '0wMd92p.png');
loadSprite('flor', 'uaUm9sN.png');

loadSprite('bloco', 'M6rwarW.png');
loadSprite('tijolo', 'pogC9x5.png'); 
loadSprite('tubo-top-left', 'ReTPiWY.png'); 
loadSprite('tubo-top-right', 'hj2GK4n.png'); 
loadSprite('tubo-bottom-left', 'c1cYSbt.png'); 
loadSprite('tubo-bottom-right', 'nqQ79eI.png');
loadSprite('blue-bloco', 'fVscIbn.png');
loadSprite('blue-tijolo', '3e5YRQd.png'); 
loadSprite('blue-aco', 'gqVoI2b.png'); 
loadSprite('blue-goomba', 'SvV4ueD.png');

loadSprite("mario", "OzrEnBy.png", {
    sliceX: 3.9,
    anims: {
        idle: {
            from: 0,
            to: 0,
        },
        move: {
            from: 1,
            to: 2,
        },
        
    },
});

//FUNCOES Movimentacao

function keyDownLeft (player) {
    keyDown('left', () => {
        player.flipX(true);
        player.move(-120,0);
    });
};

function keyDownRight(player) {
    keyDown('right', () => {
        player.flipX(false);
        player.move(120,0);
    });
};

function keyPressLeft (player) {
    keyPress('left', () => {
        player.flipX(true);
        player.play('move');
    });
};

function keyPressRight (player) {
    keyPress('right', () => {
        player.flipX(false);
        player.play('move');
    });
};

function keyReleaseLeft (player) {
    keyRelease('left', () => {
        player.play('idle');
    });
};

function keyReleaseRight (player) {
    keyRelease('right', () => {
        player.play('idle');
    });
};

//FUNCOES acao
function actionCogumelo (obj) {
    action('cogumelo', (obj) => {
        obj.move(40,0);
    });
};

function actionPlayer (player) {
    player.action(() => {
        if(player.grounded()){
            isJumping = false;
        } else {
            isJumping = true;
        } 
    });
};

function playerOn(player, obj, gameLevel) {
    player.on('headbutt', (obj) => {
        if(obj.is('moeda-surpresa')){
            gameLevel.spawn('$', obj.gridPos.sub(0,1));
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0,0));
        }

        if(obj.is('cogumelo-surpresa')){
            gameLevel.spawn('#', obj.gridPos.sub(0,1));
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0,0));
        }
        if(obj.is('bloco')) {
            if(isBig == true) {
                destroy(obj);
            }
        }
    });
};

//FUNCOES Colisao

function playerCollidesTubo(player, level, maps, score, scoreLabel) {
    player.collides('tubo', () => {
        keyPress('down', () => {
            go("game", {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                big: isBig
            });
        });
    });
};

function playerCollidesTubo2(player, level, maps, score, scoreLabel) {
    player.collides('tubo', () => {
        keyPress('down', () => {
            go("game2", {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                big: isBig
            });
        });
    });
};

function playerCollidesTubo3(player, level, maps, score, scoreLabel) {
    player.collides('tubo', () => {
        keyPress('down', () => {
            go("game3", {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                big: isBig
            });
        });
    });
};

function playerCollidesMoeda(player, obj, score, scoreLabel) {
    player.collides('moeda', (obj) => {
        destroy(obj)
        scoreLabel.value++
        scoreLabel.text = 'Moedas: ' +scoreLabel.value
    });
};

function playerCollidesDangerous(player, obj, score, scoreLabel, gameLevel) {
    player.collides('dangerous', (obj) => {
        if(isJumping == true){
            destroy(obj);
            gameLevel.spawn('$', obj.gridPos.sub(0,0));
        }else{
            if(isBig){
                player.smallify();
                destroy(obj);
            }else{
                go("lose", ({score: scoreLabel.value}));
            }
        }
    });
}

function playerCollidesCogumelo (player, obj, score, scoreLabel) {
    player.collides('cogumelo', (obj) => {
        if(isBig == true) {
            destroy(obj);
            scoreLabel.value++;
        }
        destroy(obj)
        player.biggify();
    });
};

//FASE 1

scene("game", ({ level, score, big }) => {
    layer(["bg", "obj", "ui"], "obj")

    const maps = [
        [
            '~                                   ~', 
            '~                                   ~',
            '~                                   ~',
            '~                                   ~',
            '~                                   ~',
            '~                                   ~',
            '~     %   =*=%=                     ~',
            '~                                   ~',
            '~                           -+      ~',
            '~                   ^   ^   ()      ~',
            '=====================================',
        ],
        [       
            '/                                   /',
            '/                                   /',
            '/                                   /',
            '/                                   /',
            '/                                   /',
            '/                                   /',
            '/    !!%!!%                         /',
            '/                     x x           /',
            '/                   x x x x    -+   /',
            '/          z   z  x x x x x x  ()   /',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
        [
            '                                     ',
            '                             !       ',
            '                            ======   ',
            '                     !               ',
            '             ~~    ~~~~~             ',
            '      ~%~                            ',
            '   ~                                 ',
            '                                     ',
            '/                      ^  ^ ~    ~   ',
            '=============================    ===/',
            '                            =    =  /',
            '                                    /',
            '        !                           /',
            '      %*%                           /',
            ' -+                                 /',
            ' ()!                            ^   /',
            '=================    ===============/',
            '                                     ',
            '                                     ',
            '                                     ',
          ],
          [
            '=                                   =',
            '=                                   =',
            '=                                   =',
            '=                                   =',
            '=                                   =',
            '=    ~~~~~~          =              =',
            '=                 =  =  =           =',
            '=              =  =  =  =  =        =',
            '=              =  =  =  =  =    a   =',
            '=====================================',
          ],

    ];

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid(), 'bloco'],
        '$': [sprite('moeda'), 'moeda'],
        '%': [sprite('surpresa'), solid(), 'moeda-surpresa'],
        '*': [sprite('surpresa'), solid(), 'cogumelo-surpresa'],
        '}': [sprite('unboxed'), solid()],
        '^': [sprite('goomba'), 'dangerous'],
        '#': [sprite('cogumelo'), 'cogumelo', body()],

        '~': [sprite('tijolo'), solid()],
        '(': [sprite('tubo-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('tubo-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('tubo-top-left'), solid(), 'tubo', scale(0.5)],
        '+': [sprite('tubo-top-right'), solid(), 'tubo', scale(0.5)],
        '!': [sprite('blue-bloco'), solid(), 'bloco', scale(0.5)],
        '/': [sprite('blue-tijolo'), solid(), scale(0.5)],
        'z': [sprite('blue-goomba'),body(), 'dangerous', scale(0.5)],
        'x': [sprite('blue-aco'), solid(), scale(0.5)],
        'a': [sprite('flor'), body(), 'flor', scale(1)]
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    const scoreLabel = add([
        text('Moedas: ' + score, 10),
        pos(20,5),
        layer('ui'),
        {
            value: score
        }
    ]);

    add([text('Level: ' + parseInt(level + 1) + ' Fase: 1', 10), pos(20,30)]);

    function big() {
        return {
            isBig() {
                return isBig;
            },
            smallify(){
                this.scale = vec2(0.8);
                isBig = false;
            },
            biggify(){
                this.scale = vec2(1.5);
                isBig = true;
            }
        }
    }    

    const player = add([
        
        sprite("mario", {
            animSpeed: 0.1,
            frame: 0
        }),
        solid(),
        body(),
        pos(60,0),
        big(),
        origin('bot'),
        {
            speed: 120
        }
    ]);

    if(isBig){
        player.biggify();
    };
    keyDownLeft(player);
    keyDownRight(player);
    keyPress('space', () => {
        if(player.grounded()) {
            player.jump(400);
            isJumping = true;
        };
    });
    keyPress('up', () => {
        if(player.grounded()) {
            player.jump(400);
            isJumping = true;
        };
    });
    keyPressLeft(player);
    keyPressRight(player);
    keyReleaseLeft(player);
    keyReleaseRight(player);

    actionCogumelo(obj = 'cogumelo');
    actionPlayer(player, isJumping);
    action('dangerous', (obj) => {
        obj.move(-30,0);
    });
    playerOn(player, obj, gameLevel, isBig)

    playerCollidesCogumelo(player, obj = 'cogumelo', score, scoreLabel)
    playerCollidesDangerous(player, obj = 'dangerous', score, scoreLabel, gameLevel);
    playerCollidesMoeda(player, obj = 'moeda', score, scoreLabel);
    playerCollidesTubo(player, level, maps, score, scoreLabel);

    player.collides('flor', (obj) => {
        go("win", ({score: scoreLabel.value}));
    });

});

//FASE 2

scene("game2", ({ level, score, big }) => {
    layer(["bg", "obj", "ui"], "obj")

    const maps = [
        [
            '~                                    ~', 
            '~                         -+         ~',
            '~                         ()         ~',
            '~                      ~~~~~~        ~',
            '~       ==%==%==                     ~',
            '~                      $  $          ~',
            '~                     ========        ~',
            '~  =    ==%==*==                     ~',
            '~                                    ~',
            '~      ^       ^                     ~',
            '~==========================        ~~~',
            '~                                    ~', 
            '~                                    ~',
            '~                          xx        ~', 
            '~             xxxx   xxx             ~',
            '~          x                    x    ~',
            '~    xxx                             ~',
            '~  $     $ ^ $  ^                    ~',
            '======================================',
            '======================================',
        ],
        [       
            '/                                    /', 
            '/                                    /',
            '/                                    /',
            '/                                    /',
            '/                                    /',
            '/                                    /',
            '/                               -+   /',
            '/                               ()   /',
            '/                           //////   /',
            '/                                    /',
            '/                  %*%/              /',
            '/                                    /', 
            '/                           z      z /',
            '/                       !!!!!!!!!!!!!!', 
            '/                 !!!                /',
            '/           !!!                      /',
            '/   !!!                              /',
            '/                       $    $    $  /',
            '//////////////////////////////////////',
            '//////////////////////////////////////',
        ],
        [
            '/                                   /', 
            '/                                   /',
            '/                                   /',
            '/                                   /',
            '////// $               $            /',
            '/    //  $         $////            /',
            '/     /////    $/////               /',
            '/         //$$$//        $          /',
            '/          /////           $        /',
            '/                        $          /',
            '/          !%%*!   !!%!!            /',
            '/                                   /', 
            '/                            z z z z/',
            '/////     ///////////////////////////', 
            '/                                   /',
            '/                                   /',
            '/                               -+  /',
            '/                   $   $   z z ()  /',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
          ],
          [
            '~   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', 
            '~                                   ~',
            '~  $       $   $     $      $       ~',
            '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    ~',
            '~                                   ~',
            '~           $      $   $       $    ~',
            '~    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
            '~                                   ~',
            '~    $    $      $    $    $        ~',
            '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    ~',
            '~          $        $      $        ~', 
            '~       $      $        $     $     ~',
            '~    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
            '~        $        $       $         ~', 
            '~     $      $        $       $     ~',
            '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    ~',
            '~             $                $    ~',
            '~ a    $             $     $        ~',
            '=====================================',
            '=====================================', 
          ],

    ];

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid(), 'bloco'],
        '$': [sprite('moeda'), 'moeda'],
        '%': [sprite('surpresa'), solid(), 'moeda-surpresa'],
        '*': [sprite('surpresa'), solid(), 'cogumelo-surpresa'],
        '}': [sprite('unboxed'), solid()],
        '^': [sprite('goomba'), 'dangerous'],
        '#': [sprite('cogumelo'), 'cogumelo', body()],

        '~': [sprite('tijolo'), solid()],
        '(': [sprite('tubo-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('tubo-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('tubo-top-left'), solid(), 'tubo', scale(0.5)],
        '+': [sprite('tubo-top-right'), solid(), 'tubo', scale(0.5)],
        '!': [sprite('blue-bloco'), solid(), 'bloco', scale(0.5)],
        '/': [sprite('blue-tijolo'), solid(), scale(0.5)],
        'z': [sprite('blue-goomba'),body(), 'dangerous', scale(0.5)],
        'x': [sprite('blue-aco'), solid(), scale(0.5)],
        'a': [sprite('flor'), body(), 'flor', scale(1)]
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    const scoreLabel = add([
        text('Moedas: ' + score, 10),
        pos(20,5),
        layer('ui'),
        {
            value: score
        }
    ]);

    add([text('Level: ' + parseInt(level + 1) + ' Fase: 2', 10), pos(20,30)]);

    function big() {
        return {
            isBig() {
                return isBig;
            },
            smallify(){
                this.scale = vec2(0.8);
                isBig = false;
            },
            biggify(){
                this.scale = vec2(1.5);
                isBig = true;
            }
        }
    }    

    const player = add([
        
        sprite("mario", {
            animSpeed: 0.1,
            frame: 0
        }),
        solid(),
        body(),
        pos(60,0),
        big(),
        origin('bot'),
        {
            speed: 120
        }
    ]);

    if(isBig){
        player.biggify();
    };
    keyDownLeft(player);
    keyDownRight(player);
    keyPress('space', () => {
        if(player.grounded()) {
            player.jump(400);
            isJumping = true;
        };
    });
    keyPress('up', () => {
        if(player.grounded()) {
            player.jump(400);
            isJumping = true;
        };
    });
    keyPressLeft(player);
    keyPressRight(player);
    keyReleaseLeft(player);
    keyReleaseRight(player);

    actionCogumelo(obj = 'cogumelo');
    actionPlayer(player, isJumping);
    action('dangerous', (obj) => {
        if(level == 0) {
            obj.move(30,0);
        } else {
            obj.move(-30,0);
        };
    });
    playerOn(player, obj, gameLevel, isBig)

    playerCollidesCogumelo(player, obj = 'cogumelo', score, scoreLabel)
    playerCollidesDangerous(player, obj = 'dangerous', score, scoreLabel, gameLevel);
    playerCollidesMoeda(player, obj = 'moeda', score, scoreLabel);
    playerCollidesTubo2(player, level, maps, score, scoreLabel);

    player.collides('flor', (obj) => {
        go("win2", ({score: scoreLabel.value}));
    })
});

//FASE 3

scene("game3", ({ level, score, big }) => {
    layer(["bg", "obj", "ui"], "obj")

    const maps = [
        [
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~               $  $                 ~',
            '~              =======               ~',
            '~                                    ~', 
            '~                        $    $      ~',
            '~                      ==%*%%==      ~',
            '~                                    ~',
            '~                 $       $          ~',
            '~               ======    =          ~',
            '~                                    ~',
            '~                z  z   z   z   z  z ~',
            '====  ================================',
            '====  ================================', 
            '   =-+=                               ',
            '   =()=',
        ],
        [       
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~=======                             ~',
            '~      ~                             ~',
            '~      ~                             ~',
            '~      ~=======                      ~',
            '~             ~                      ~',
            '~   $ $ $     ~   ======             ~',
            '~  $ $ $ $    ~                      ~',
            '~    $ $      ~                      ~', 
            '~             ~                      ~',
            '~             ~                      ~',
            '~   ~~~~      ~                      ~', 
            '~             ~                      ~',
            '~       ~~~~  ~                      ~',
            '~                                    ~',
            '~-+                                z ~',
            '======================================',
            '======================================', 
        ],
        [
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '======================================',
            '======================================', 
          ],
          [
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~', 
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '~                                    ~',
            '======================================',
            '======================================', 
          ],

    ];

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid(), 'bloco'],
        '$': [sprite('moeda'), 'moeda'],
        '%': [sprite('surpresa'), solid(), 'moeda-surpresa'],
        '*': [sprite('surpresa'), solid(), 'cogumelo-surpresa'],
        '}': [sprite('unboxed'), solid()],
        '^': [sprite('goomba'), 'dangerous'],
        '#': [sprite('cogumelo'), 'cogumelo', body()],

        '~': [sprite('tijolo'), solid()],
        '(': [sprite('tubo-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('tubo-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('tubo-top-left'), solid(), 'tubo', scale(0.5)],
        '+': [sprite('tubo-top-right'), solid(), 'tubo', scale(0.5)],
        '!': [sprite('blue-bloco'), solid(), 'bloco', scale(0.5)],
        '/': [sprite('blue-tijolo'), solid(), scale(0.5)],
        'z': [sprite('blue-goomba'),body(), 'dangerous', scale(0.5)],
        'x': [sprite('blue-aco'), solid(), scale(0.5)],
        'a': [sprite('flor'), body(), 'flor', scale(1)]
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    const scoreLabel = add([
        text('Moedas: ' + score, 10),
        pos(20,5),
        layer('ui'),
        {
            value: score
        }
    ]);

    add([text('Level: ' +parseInt(level + 1), 10), pos(20,30)]);

    function big() {
        return {
            isBig() {
                return isBig;
            },
            smallify(){
                this.scale = vec2(0.8);
                isBig = false;
            },
            biggify(){
                this.scale = vec2(1.5);
                isBig = true;
            }
        }
    }    

    const player = add([
        
        sprite("mario", {
            animSpeed: 0.1,
            frame: 0
        }),
        solid(),
        body(),
        pos(60,0),
        big(),
        origin('bot'),
        {
            speed: 120
        }
    ]);

    if(isBig){
        player.biggify();
    };
    keyDownLeft(player);
    keyDownRight(player);
    keyPress('space', () => {
        if(player.grounded()) {
            player.jump(400);
            isJumping = true;
        };
    });
    keyPress('up', () => {
        if(player.grounded()) {
            player.jump(400);
            isJumping = true;
        };
    });
    keyPressLeft(player);
    keyPressRight(player);
    keyReleaseLeft(player);
    keyReleaseRight(player);

    actionCogumelo(obj = 'cogumelo');
    actionPlayer(player, isJumping);
    action('dangerous', (obj) => {
        obj.move(-30,0);
    });
    playerOn(player, obj, gameLevel, isBig)

    playerCollidesCogumelo(player, obj = 'cogumelo', score, scoreLabel)
    playerCollidesDangerous(player, obj = 'dangerous', score, scoreLabel, gameLevel);
    playerCollidesMoeda(player, obj = 'moeda', score, scoreLabel);
    playerCollidesTubo3(player, level, maps, score, scoreLabel);

    player.collides('flor', (obj) => {
        go("win3", ({score: scoreLabel.value}));
    });
});

//TELAS FINAIS

scene("lose", ({score}) => {
    add([ 
        text('Score: ' + score + ' Precione ESPACO para tentar novamente', 10), 
        origin('center'), 
        pos(width()/2, height()/2) ]);
    keyPress('space', () => {
        go("game", {level: 0, score: 0, big: isBig});
    });
});

scene("win", ({score}) => {
    add([
        text('Voce venceu! Sua pontuacao foi de: ' + score + ' Precione ESPACO para Continuar', 10),
        origin('center'),
        pos(width()/2, height()/2)]);
    keyPress('space', () => {
        go("game2", {level: 0, score: 0, big: isBig});
    });
});

scene("win2", ({score}) => {
    add([
        text('Voce venceu! Sua pontuacao foi de: ' + score + ' Precione ESPACO para Continuar', 10),
        origin('center'),
        pos(width()/2, height()/2)]);
    keyPress('space', () => {
        go("game3", {level: 0, score: 0, big: isBig});
    });
});

scene("win3", ({score}) => {
    add([
        text('Voce venceu! Sua pontuacao foi de: ' + score + ' Precione ESPACO para Continuar', 10),
        origin('center'),
        pos(width()/2, height()/2)]);
    keyPress('space', () => {
        go("game4", {level: 0, score: 0, big: isBig});
    });
});

scene("main", ({score}) => {
    add([
        text('Selecione a fase que deseja jogar. Aperte 1 para fase 1, 2 para fase 2, 3 para fase 3', 10),
        origin('center'),
        pos(width()/2, height()/2)]);
    keyPress('1', () => {
        go("game", {level: 0, score: 0, big: isBig});
    });
    keyPress('2', () => {
        go("game2", {level: 0, score: 0, big: isBig});
    });
    keyPress('3', () => {
        go("game3", {level: 0, score: 0, big: isBig});
    });
});

go("main", ({ level: 0, score: 0, big: isBig }));