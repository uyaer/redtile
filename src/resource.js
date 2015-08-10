var lang = cc.sys.language == cc.sys.LANGUAGE_CHINESE ? "zh" : "en";
var FONT = lang == "zh" ? "res/font/font_zh.fnt" : "res/font/font_en.fnt";

var res = {
    el_1_2: "res/el/1-2-snow.plist",
    el_1_2_png: "res/el/1-2-snow.png",
    el_1_3: "res/el/1-3-star.plist",
    el_1_3_png: "res/el/1-3-star.png",
    el_cloud: "res/el/cloud.plist",
    el_cloud_png: "res/el/cloud.png",
    el_fire: "res/el/fire.plist",
    el_fire_png: "res/el/fire.png",

    font_fnt: FONT,//"res/font/font_zh.fnt",
    font_png: FONT.replace(".fnt", ".png"),//"res/font/font_zh.png",

    audio_bg: "res/sounds/bgsound.mp3",
    audio_dead: "res/sounds/dead.mp3",
    audio_jump: "res/sounds/jump.mp3",
    audio_run: "res/sounds/run.mp3",

    cbg: "res/cbg.png",
    complete_eff: "res/complete_eff.plist",
    info_zh: "res/info_zh.json",
    data: "res/data.json",

    level1: "res/Level1.json",
    level2: "res/Level2.json",
    level3: "res/Level3.json",
    level4: "res/Level4.json",
    level5: "res/Level5.json",
    level6: "res/Level6.json",
    level7: "res/Level7.json",
    level8: "res/Level8.json",
    level9: "res/Level9.json",
    level10: "res/Level10.json",

    bg_1_1:"res/bg/1-1.png",
    bg_1_2:"res/bg/1-2.png",
    bg_1_3:"res/bg/1-3.png",
    bg_2_1:"res/bg/2-1.png",
    bg_2_2:"res/bg/2-2.png",
    bg_3_1:"res/bg/3-1.png",
    bg_3_2:"res/bg/3-2.png",
    bg_3_3:"res/bg/3-3.png",
    bg_3_4:"res/bg/3-4.png",
    bg_3_5:"res/bg/3-5.png",
    bg_3_6:"res/bg/3-6.png",
    bg_3_7:"res/bg/3-7.png",
    bg_3_8:"res/bg/3-8.png",
    bg_3_9:"res/bg/3-9.png",

    menu: "res/menu.plist",
    menu_png: "res/menu.png",
    player: "res/player.plist",
    player_png: "res/player.png",
    ui: "res/ui.plist",
    ui_png: "res/ui.png"

}

var g_resources = [];

for (var key in res) {
    g_resources.push(res[key]);
}