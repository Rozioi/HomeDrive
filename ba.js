var v1 = Point.get(1421, 557),
    v2 = Point.get(2101, 557),
    v3 = Point.get(1158, 775),
    v4 = Point.get(1383, 441),
    v5 = Point.get(1285, 723),
    v6 = Point.get(2218, 121);

var v7 = 13619138,
    v8 = 10191710,
    v9 = 6315357;

short v10 = 3,
    v11 = 140,
    v12 = 13000;


byte v14 = 40;




// ! ниже не трогай ¡

log("бесплатный скрипт от t.me/SliderOff");
log("бесплатный скрипт от t.me/venomskript");



var v13 = Time.getMillis();

var v15 = Point.get(v1.x - v14, v1.y - v14),
    v16 = Point.get(v1.x + v14, v1.y + v14);

log("Скрипт запущен в - " + Time.getTime());
startScreenCapture(2);

while (!EXIT) {
    var v17 = getColor(v4.x, v4.y),
        v18 = getColor(v5.x, v5.y),
        v19 = getColor(v6.x, v6.y);

    if (v17 != v7) {
        click(v4.x, v4.y);
        sleep(500);
    } else if (v18 == v8) {
        click(v5.x, v5.y);
        sleep(500);
    } else if (v19 == v9) {
        click(v6.x, v6.y);
        sleep(500);
    }

        var i = 0;
        while (i < v10) {
            var SliderOff = 20;
            var script = v11 * i;
            var venomscript = getContoursCount(Point.get(v15.x, v15.y + script), Point.get(v16.x, v16.y + script));

            if (venomscript > 2 && SliderOff == 20) {
                sleep(5);
                click(v2.x, v2.y + script);
                sleep(SliderOff);
                click(v3.x, v3.y);
                click(v6.x, v6.y);
                sleep(5);
                click(v4.x, v4.y);
                sleep(5);
                click(v4.x, v4.y);
            }
            i++;
        }

            if (Time.getMillis() - v13 >= v12) {
                click(v4.x, v4.y);
                Thread.sleep(5);
                click(v4.x, v4.y);
                v13 = Time.getMillis();
            }
}
