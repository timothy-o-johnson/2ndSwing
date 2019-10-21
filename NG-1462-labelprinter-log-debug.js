// NG-1462
// 10/17/19

// https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=265
// script id: customscript_wms_labelprinter
// context debug

var dog = {
  request: {
    type: 'http.ServerRequest',
    method: 'GET',
    url: 'https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl',
    parameters: {
      items: '["purchaseorder:3322229:inventoryitem:2799392:9835937"]',
      compid: '4537321_SB1',
      script: '265',
      deploy: '1'
    },
    headers: {
      referer:
        'https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3322229&whence=',
      'sec-fetch-site': 'same-origin',
      'true-client-ip': '24.254.170.29',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
      'x-advpf-parse-category': 'DEFAULT_ALLHTML',
      'Accept-Encoding': 'gzip',
      Dnt: '1',
      'sec-fetch-user': '?1',
      'True-Client-IP': '24.254.170.29',
      via:
        '1.1 v1-akamaitech.net(ghost) (AkamaiGHost), 1.1 akamai.net(ghost) (AkamaiGHost)',
      'Sec-Fetch-Mode': 'navigate',
      'x-forwarded-host': '4537321-sb1.app.netsuite.com',
      'Upgrade-Insecure-Requests': '1',
      'upgrade-insecure-requests': '1',
      host: '4537321-sb1.app.netsuite.com',
      'X-Advpf-Parse-Category': 'DEFAULT_ALLHTML',
      'ns-client-ip': '24.254.170.29',
      connection: 'Keep-Alive',
      'Sec-Fetch-User': '?1',
      'cache-control': 'no-cache, max-age=0',
      'sec-fetch-mode': 'navigate',
      Cookie:
        'AMCV_A6F7776A5245B0EF0A490D44%40AdobeOrg=T; _gcl_au=1.1.9466519.1570135326; __utmz=19239463.1570135326.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); bn_u=6927988791787752467; loginredirect=true; logincountry=US; Zs1EHIXHehv2RdHv1HkdLQ=AAABbZbixjIhtiCjrSGkkYrZZQP18VZKUoFrKC-h4NIujy9gkFWBdA; lastUser=4537321_SB1_1269484_1033; atgRecVisitorId=13961QwWWl2iLro7q__Wv_SiN_ka6E7mtNzR1GSonfle-UwD108; mbox=PC#2f8c65a8ea0e4f99a400561abe4d053e.28_8#1572356616|check#true#1571147076|session#aa8012eb3829431f8acafe7c7933f9fd#1571148876; __utma=19239463.1315776687.1570135326.1570826734.1571147017.6; s_vnum=1572580800490%26vn%3D5; s_nr=1571147019254-Repeat; NS_ROUTING_VERSION=LAGGING; ScreenWidth=2560; ScreenHeight=1440; NS_VER=2019.1.0; uir_list_filters_expanded=1; JSESSIONID=GxjZ_0Cj2BmrYlg645pnifFuvW7vUYzTuZBZRZzlvQTgiPjp8O9UdbrgQbM6EWAasq_kdEtFjvTUZaJSy-Sq7XnfNQKMUgVB1yio6YzVkXiAmQT_FV9PvyGiIuTaNyKK!664663607; jsid_own=4537321_SB1.-2122275447; stickytags=dummy,EVENTS:q4wAZu1GG,OTHERCARD:q4wAZu1GG,EVENT_REMINDERS:q4wAZvgol,RECENTRECORDS:q4wAZvf3C,STARTUP:q4wAZu1GG,VERYSTATICPAGE:q4wAZu1GG,QUICK_SEARCH:q4wAZu1GG,ACCOUNTCENTER:q4wAZu1GG,FOLLOWNETSUITE:q4wAZu1GG,SHORTCUTS:q4wAZu1GG,USERGROUP:q4wAZu1GG,SYSTEMSTATUS:q4wAZu1GG,SCRIPTPORTLET:q4wAZvgol,NEWFEATURES:q4wAZu1GG,SUITEANSWERS:q4wAZu1GG,REMINDERS:q4wAZu1GG,ROLEMENU:q4wAZu1GG,RSSSOURCE:q4wAZu1GG,SNAPSHOTS:q4wAZu1GG,MAPPING:q4wAZu1GG,HOME:q4wAZu1GG,NAVMENUS:q4wAZu1GG,KPIMETER:q4wAZu1GG; base_t=',
      'Akamai-Origin-Hop': '2',
      'NS-Client-IP': '24.254.170.29',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      cookie:
        'AMCV_A6F7776A5245B0EF0A490D44%40AdobeOrg=T; _gcl_au=1.1.9466519.1570135326; __utmz=19239463.1570135326.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); bn_u=6927988791787752467; loginredirect=true; logincountry=US; Zs1EHIXHehv2RdHv1HkdLQ=AAABbZbixjIhtiCjrSGkkYrZZQP18VZKUoFrKC-h4NIujy9gkFWBdA; lastUser=4537321_SB1_1269484_1033; atgRecVisitorId=13961QwWWl2iLro7q__Wv_SiN_ka6E7mtNzR1GSonfle-UwD108; mbox=PC#2f8c65a8ea0e4f99a400561abe4d053e.28_8#1572356616|check#true#1571147076|session#aa8012eb3829431f8acafe7c7933f9fd#1571148876; __utma=19239463.1315776687.1570135326.1570826734.1571147017.6; s_vnum=1572580800490%26vn%3D5; s_nr=1571147019254-Repeat; NS_ROUTING_VERSION=LAGGING; ScreenWidth=2560; ScreenHeight=1440; NS_VER=2019.1.0; uir_list_filters_expanded=1; JSESSIONID=GxjZ_0Cj2BmrYlg645pnifFuvW7vUYzTuZBZRZzlvQTgiPjp8O9UdbrgQbM6EWAasq_kdEtFjvTUZaJSy-Sq7XnfNQKMUgVB1yio6YzVkXiAmQT_FV9PvyGiIuTaNyKK!664663607; jsid_own=4537321_SB1.-2122275447; stickytags=dummy,EVENTS:q4wAZu1GG,OTHERCARD:q4wAZu1GG,EVENT_REMINDERS:q4wAZvgol,RECENTRECORDS:q4wAZvf3C,STARTUP:q4wAZu1GG,VERYSTATICPAGE:q4wAZu1GG,QUICK_SEARCH:q4wAZu1G'
    }
  }
}
