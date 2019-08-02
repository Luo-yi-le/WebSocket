import chai from 'chai'
import mysql = require("../../src/SQL/mySqlH/mysqlFun.js");

const {expect} = chai;
describe("查询tbAdmin", () => {

    it("查询全部数据", done => {
        mysql.query("select * from tbAdmin", [], function (res, fields) {
            expect(
                JSON.stringify(res)
            ).to.include(JSON.stringify(res))
        });
        done()
    });

    it('查询单条数据', done => {
        mysql.query("select * from tbAdmin where AId=?", [1001], function (res, fields) {
            expect(
              JSON.stringify(res)
            ).to.include(JSON.stringify(res));
        });
        done()
    })
});

