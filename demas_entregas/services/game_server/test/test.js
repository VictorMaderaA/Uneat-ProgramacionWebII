var chai = require('chai')
    , chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const {app, createBulletPlayer, createGame, createPlayer} = require('../src/index')

const server = app;


describe("Tests", () => {
    describe("E2E", () => {
        // Test to get all students record
        it("Test Hola Mundo", (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                });
        });

        it("Nuevo Juego", (done) => {
            chai.request(server)
                .get('/new-game')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 80,
                        w: 60,
                        player: {
                            alive: true,
                            position: {
                                x: 30,
                                y: 1
                            }
                        },
                        playing: true,
                        bullets: [],
                        enemies: [
                            {
                                alive: true,
                                position: {
                                    x: 30,
                                    y: 80
                                }
                            }
                        ],
                    })
                    done();
                });
        });

        it("Move", (done) => {
            chai.request(server)
                .post('/move')
                .send({
                    h: 2,
                    w: 2,
                    player: {
                        alive: true,
                        position: {
                            x: 1,
                            y: 1
                        }
                    },
                    playing: true,
                    bullets: [],
                    enemies: [],
                    input: {
                        x: 1,
                        y: 1
                    }
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 2,
                        w: 2,
                        player: {
                            alive: true,
                            position: {
                                x: 2,
                                y: 2
                            }
                        },
                        playing: true,
                        bullets: [],
                        enemies: [],
                    })
                    done();
                });
        });

        it("Move Border", (done) => {
            chai.request(server)
                .post('/move')
                .send({
                    h: 2,
                    w: 2,
                    player: {
                        alive: true,
                        position: {
                            x: 0,
                            y: 0
                        }
                    },
                    playing: true,
                    bullets: [],
                    enemies: [],
                    input: {
                        x: -1,
                        y: -1
                    }
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 2,
                        w: 2,
                        player: {
                            alive: true,
                            position: {
                                x: 0,
                                y: 0
                            }
                        },
                        playing: true,
                        bullets: [],
                        enemies: [],
                    })
                    done();
                });
        });

        it("Shoot", (done) => {
            chai.request(server)
                .post('/shoot')
                .send({
                    h: 10,
                    w: 10,
                    player: {
                        alive: true,
                        position: {
                            x: 0,
                            y: 0
                        }
                    },
                    playing: true,
                    bullets: [],
                    enemies: [],
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 10,
                        w: 10,
                        player: {
                            alive: true,
                            position: {
                                x: 0,
                                y: 0
                            }
                        },
                        playing: true,
                        bullets: [{
                            owner: 0,
                            position: {
                                x: 0,
                                y: 1
                            }
                        }],
                        enemies: [],
                    })
                    done();
                });
        });

        it("Bullet Move", (done) => {
            chai.request(server)
                .post('/tick')
                .send({
                    h: 3,
                    w: 1,
                    player: {},
                    playing: true,
                    bullets: [{
                        owner: 0,
                        position: {
                            x: 0,
                            y: 0
                        }
                    }, {
                        owner: 1,
                        position: {
                            x: 0,
                            y: 3
                        }
                    }],
                    enemies: [],
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 3,
                        w: 1,
                        player: {},
                        playing: true,
                        bullets: [{
                            owner: 0,
                            position: {
                                x: 0,
                                y: 1
                            }
                        }, {
                            owner: 1,
                            position: {
                                x: 0,
                                y: 2
                            }
                        }],
                        enemies: [],
                    })
                    done();
                });
        });

    })

    describe("Unitests", () => {
        // Test to get all students record
        it("Crear Bala Jugador", (done) => {
            const bullet = createBulletPlayer(0,0);
            expect(bullet).to.be.eql({
                owner: 0,
                position: {
                    x: 0,
                    y: 1
                }
            })
            done();
        });

        it("Crear Jugador", (done) => {
            const bullet = createPlayer(2);
            expect(bullet).to.be.eql({
                alive: true,
                position: {
                    x: 1,
                    y: 1
                }
            })
            done();
        });

        it("Crear Juego", (done) => {
            const bullet = createGame(80, 60);
            expect(bullet).to.be.eql({
                h: 80,
                w: 60,
                player: {
                    alive: true,
                    position: {
                        x: 30,
                        y: 1
                    }
                },
                playing: true,
                bullets: [],
                enemies: [
                    {
                        alive: true,
                        position: {
                            x: 30,
                            y: 80
                        }
                    }
                ],
            })
            done();
        });

    })
})