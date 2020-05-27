/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    /**
     * Handles the hardware key event.
     * @private
     * @param {Object} event - The hardware key event object
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                // If the back key is pressed, exit the application.
                tizen.application.getCurrentApplication().exit();
//            	getSalatTimesForCurrentMonth(function() {
//            		console.log('data updated');
//            	});
            	
            } catch (ignore) {}
        }
    }
    
    function getSalatTimesForCurrentMonth(callback) {
    	$.get("https://ezanvakti.herokuapp.com/vakitler?ilce=11094", function(data) {
    		localStorage.setItem('salatTimes', JSON.stringify(data));
			localStorage.setItem('lastUpdate', new Date());
    		callback(data);
    	});
    }
    
    function setDataToView(dataOfToday) {
    	console.log('dataOfToday', dataOfToday)
		var MiladiTarihKisa = dataOfToday["MiladiTarihKisa"];
		var Gunes = dataOfToday["Gunes"];
		var GunesDogus = dataOfToday["GunesDogus"];
		var Imsak = dataOfToday["Imsak"];
		var Ogle = dataOfToday["Ogle"];
		var Ikindi = dataOfToday["Ikindi"];
		var Aksam = dataOfToday["Aksam"];
		var Yatsi = dataOfToday["Yatsi"];

		$('#MiladiTarihKisa').text(MiladiTarihKisa);
		$('#Gunes').text(Gunes);
		//$('#GunesDogus').text(GunesDogus);
		$('#Imsak').text(Imsak);
		$('#Ogle').text(Ogle);
		$('#Ikindi').text(Ikindi);
		$('#Aksam').text(Aksam);
		$('#Yatsi').text(Yatsi);
		
//		Aksam	"18:15"
//		AyinSekliURL	"http://namazvakti.diyanet.gov.tr/images/r5.gif"
//		Gunes	"07:02"
//		GunesBatis	"18:08"
//		GunesDogus	"07:09"
//		HicriTarihKisa	"6.7.1441"
//		HicriTarihUzun	"6 Recep 1441"
//		Ikindi	"15:37"
//		Imsak	"05:22"
//		KibleSaati	"09:20"
//		MiladiTarihKisa	"01.03.2020"
//		MiladiTarihKisaIso8601	"01.03.2020"
//		MiladiTarihUzun	"01 Mart 2020 Pazar"
//		MiladiTarihUzunIso8601	"2020-03-01T00:00:00.0000000+03:00"
//		Ogle	"12:44"
//		Yatsi	"19:35"
    }
    
    function getSalatTimes(callBack) {
    	var now = new Date();
    	var lastUpdate = localStorage.getItem('lastUpdate');
    	
    	console.log('now', now);
    	console.log('lastUpdate', lastUpdate);
    	
    	//var diff = Date.parse(now) - Date.parse(lastUpdate);
    	//var pastDays =  isNaN( diff ) ? 0 : Math.floor( diff / 86400000);
    	   
    	var pastDays = 0;
    	var getNewData = false;
    	if (!lastUpdate) {
    		getNewData = true;
    		console.log('lastUpdate not set');
    	} else {
    		var diff = Date.parse(now) - Date.parse(lastUpdate);
    		pastDays =  isNaN( diff ) ? 0 : Math.floor( diff / 86400000);
    		console.log('pastDays', pastDays);
    		if (pastDays >= 28) {
    			console.log('past days >= 28');
    			getNewData = true;
    		}    		
    	}
    	
    	if (getNewData) {
    		console.log('getting new data');
    		getSalatTimesForCurrentMonth(function(salatTimes) {
    			callBack(salatTimes[0]);
    		});
    	} else {
    		var storageData = localStorage.getItem('salatTimes');
    		console.log(storageData);
    		try {
    			var salatTimes = JSON.parse(storageData);
    			console.log('salatTimes', salatTimes);
    			callBack(salatTimes[pastDays]);
    		} catch (e) {
				localStorage.removeItem('salatTimes');
				localStorage.removeItem('lastUpdate');
			}
    	}
    	
    	
    	
    	
    	
    	/*
    	var salatTimes = localStorage.getItem('salatTimes');
    	if (!salatTimes) {
    		console.log('getting salat times');
    		salatTimes = [{"Aksam":"21:18","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd7.gif","Gunes":"05:28","GunesBatis":"21:11","GunesDogus":"05:35","HicriTarihKisa":"28.9.1441","HicriTarihUzun":"28 Ramazan 1441","Ikindi":"17:39","Imsak":"03:58","KibleSaati":"11:14","MiladiTarihKisa":"21.05.2020","MiladiTarihKisaIso8601":"21.05.2020","MiladiTarihUzun":"21 Mayıs 2020 Perşembe","MiladiTarihUzunIso8601":"2020-05-21T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:38"},{"Aksam":"21:19","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/ictima.gif","Gunes":"05:26","GunesBatis":"21:12","GunesDogus":"05:33","HicriTarihKisa":"29.9.1441","HicriTarihUzun":"29 Ramazan 1441","Ikindi":"17:39","Imsak":"03:56","KibleSaati":"11:15","MiladiTarihKisa":"22.05.2020","MiladiTarihKisaIso8601":"22.05.2020","MiladiTarihUzun":"22 Mayıs 2020 Cuma","MiladiTarihUzunIso8601":"2020-05-22T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:39"},{"Aksam":"21:21","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/ruyet.gif","Gunes":"05:25","GunesBatis":"21:14","GunesDogus":"05:32","HicriTarihKisa":"30.9.1441","HicriTarihUzun":"30 Ramazan 1441","Ikindi":"17:40","Imsak":"03:55","KibleSaati":"11:15","MiladiTarihKisa":"23.05.2020","MiladiTarihKisaIso8601":"23.05.2020","MiladiTarihUzun":"23 Mayıs 2020 Cumartesi","MiladiTarihUzunIso8601":"2020-05-23T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:41"},{"Aksam":"21:22","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/r0.gif","Gunes":"05:24","GunesBatis":"21:15","GunesDogus":"05:31","HicriTarihKisa":"1.10.1441","HicriTarihUzun":"1 Şevval 1441","Ikindi":"17:40","Imsak":"03:54","KibleSaati":"11:16","MiladiTarihKisa":"24.05.2020","MiladiTarihKisaIso8601":"24.05.2020","MiladiTarihUzun":"24 Mayıs 2020 Pazar","MiladiTarihUzunIso8601":"2020-05-24T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:42"},{"Aksam":"21:23","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/r1.gif","Gunes":"05:23","GunesBatis":"21:16","GunesDogus":"05:30","HicriTarihKisa":"2.10.1441","HicriTarihUzun":"2 Şevval 1441","Ikindi":"17:41","Imsak":"03:53","KibleSaati":"11:16","MiladiTarihKisa":"25.05.2020","MiladiTarihKisaIso8601":"25.05.2020","MiladiTarihUzun":"25 Mayıs 2020 Pazartesi","MiladiTarihUzunIso8601":"2020-05-25T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:43"},{"Aksam":"21:24","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/r2.gif","Gunes":"05:22","GunesBatis":"21:17","GunesDogus":"05:29","HicriTarihKisa":"3.10.1441","HicriTarihUzun":"3 Şevval 1441","Ikindi":"17:41","Imsak":"03:52","KibleSaati":"11:17","MiladiTarihKisa":"26.05.2020","MiladiTarihKisaIso8601":"26.05.2020","MiladiTarihUzun":"26 Mayıs 2020 Salı","MiladiTarihUzunIso8601":"2020-05-26T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:44"},{"Aksam":"21:25","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/r3.gif","Gunes":"05:21","GunesBatis":"21:18","GunesDogus":"05:28","HicriTarihKisa":"4.10.1441","HicriTarihUzun":"4 Şevval 1441","Ikindi":"17:42","Imsak":"03:51","KibleSaati":"11:18","MiladiTarihKisa":"27.05.2020","MiladiTarihKisaIso8601":"27.05.2020","MiladiTarihUzun":"27 Mayıs 2020 Çarşamba","MiladiTarihUzunIso8601":"2020-05-27T00:00:00.0000000+03:00","Ogle":"13:28","Yatsi":"22:45"},{"Aksam":"21:27","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/r4.gif","Gunes":"05:21","GunesBatis":"21:20","GunesDogus":"05:28","HicriTarihKisa":"5.10.1441","HicriTarihUzun":"5 Şevval 1441","Ikindi":"17:42","Imsak":"03:51","KibleSaati":"11:18","MiladiTarihKisa":"28.05.2020","MiladiTarihKisaIso8601":"28.05.2020","MiladiTarihUzun":"28 Mayıs 2020 Perşembe","MiladiTarihUzunIso8601":"2020-05-28T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:47"},{"Aksam":"21:28","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/r5.gif","Gunes":"05:20","GunesBatis":"21:21","GunesDogus":"05:27","HicriTarihKisa":"6.10.1441","HicriTarihUzun":"6 Şevval 1441","Ikindi":"17:43","Imsak":"03:50","KibleSaati":"11:19","MiladiTarihKisa":"29.05.2020","MiladiTarihKisaIso8601":"29.05.2020","MiladiTarihUzun":"29 Mayıs 2020 Cuma","MiladiTarihUzunIso8601":"2020-05-29T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:48"},{"Aksam":"21:29","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/ilkdordun.gif","Gunes":"05:19","GunesBatis":"21:22","GunesDogus":"05:26","HicriTarihKisa":"7.10.1441","HicriTarihUzun":"7 Şevval 1441","Ikindi":"17:43","Imsak":"03:49","KibleSaati":"11:19","MiladiTarihKisa":"30.05.2020","MiladiTarihKisaIso8601":"30.05.2020","MiladiTarihUzun":"30 Mayıs 2020 Cumartesi","MiladiTarihUzunIso8601":"2020-05-30T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:49"},{"Aksam":"21:30","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/i1.gif","Gunes":"05:18","GunesBatis":"21:23","GunesDogus":"05:25","HicriTarihKisa":"8.10.1441","HicriTarihUzun":"8 Şevval 1441","Ikindi":"17:44","Imsak":"03:48","KibleSaati":"11:20","MiladiTarihKisa":"31.05.2020","MiladiTarihKisaIso8601":"31.05.2020","MiladiTarihUzun":"31 Mayıs 2020 Pazar","MiladiTarihUzunIso8601":"2020-05-31T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:50"},{"Aksam":"21:31","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/i2.gif","Gunes":"05:17","GunesBatis":"21:24","GunesDogus":"05:24","HicriTarihKisa":"9.10.1441","HicriTarihUzun":"9 Şevval 1441","Ikindi":"17:44","Imsak":"03:47","KibleSaati":"11:20","MiladiTarihKisa":"01.06.2020","MiladiTarihKisaIso8601":"01.06.2020","MiladiTarihUzun":"01 Haziran 2020 Pazartesi","MiladiTarihUzunIso8601":"2020-06-01T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:51"},{"Aksam":"21:32","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/i3.gif","Gunes":"05:17","GunesBatis":"21:25","GunesDogus":"05:24","HicriTarihKisa":"10.10.1441","HicriTarihUzun":"10 Şevval 1441","Ikindi":"17:44","Imsak":"03:47","KibleSaati":"11:21","MiladiTarihKisa":"02.06.2020","MiladiTarihKisaIso8601":"02.06.2020","MiladiTarihUzun":"02 Haziran 2020 Salı","MiladiTarihUzunIso8601":"2020-06-02T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:52"},{"Aksam":"21:33","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/i4.gif","Gunes":"05:16","GunesBatis":"21:26","GunesDogus":"05:23","HicriTarihKisa":"11.10.1441","HicriTarihUzun":"11 Şevval 1441","Ikindi":"17:45","Imsak":"03:46","KibleSaati":"11:22","MiladiTarihKisa":"03.06.2020","MiladiTarihKisaIso8601":"03.06.2020","MiladiTarihUzun":"03 Haziran 2020 Çarşamba","MiladiTarihUzunIso8601":"2020-06-03T00:00:00.0000000+03:00","Ogle":"13:29","Yatsi":"22:53"},{"Aksam":"21:34","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/i5.gif","Gunes":"05:16","GunesBatis":"21:27","GunesDogus":"05:23","HicriTarihKisa":"12.10.1441","HicriTarihUzun":"12 Şevval 1441","Ikindi":"17:45","Imsak":"03:46","KibleSaati":"11:22","MiladiTarihKisa":"04.06.2020","MiladiTarihKisaIso8601":"04.06.2020","MiladiTarihUzun":"04 Haziran 2020 Perşembe","MiladiTarihUzunIso8601":"2020-06-04T00:00:00.0000000+03:00","Ogle":"13:30","Yatsi":"22:54"},{"Aksam":"21:35","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/i7.gif","Gunes":"05:15","GunesBatis":"21:28","GunesDogus":"05:22","HicriTarihKisa":"13.10.1441","HicriTarihUzun":"13 Şevval 1441","Ikindi":"17:46","Imsak":"03:45","KibleSaati":"11:23","MiladiTarihKisa":"05.06.2020","MiladiTarihKisaIso8601":"05.06.2020","MiladiTarihUzun":"05 Haziran 2020 Cuma","MiladiTarihUzunIso8601":"2020-06-05T00:00:00.0000000+03:00","Ogle":"13:30","Yatsi":"22:55"},{"Aksam":"21:35","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/dolunay.gif","Gunes":"05:14","GunesBatis":"21:28","GunesDogus":"05:21","HicriTarihKisa":"14.10.1441","HicriTarihUzun":"14 Şevval 1441","Ikindi":"17:46","Imsak":"03:44","KibleSaati":"11:23","MiladiTarihKisa":"06.06.2020","MiladiTarihKisaIso8601":"06.06.2020","MiladiTarihUzun":"06 Haziran 2020 Cumartesi","MiladiTarihUzunIso8601":"2020-06-06T00:00:00.0000000+03:00","Ogle":"13:30","Yatsi":"22:55"},{"Aksam":"21:36","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/d1.gif","Gunes":"05:14","GunesBatis":"21:29","GunesDogus":"05:21","HicriTarihKisa":"15.10.1441","HicriTarihUzun":"15 Şevval 1441","Ikindi":"17:46","Imsak":"03:44","KibleSaati":"11:24","MiladiTarihKisa":"07.06.2020","MiladiTarihKisaIso8601":"07.06.2020","MiladiTarihUzun":"07 Haziran 2020 Pazar","MiladiTarihUzunIso8601":"2020-06-07T00:00:00.0000000+03:00","Ogle":"13:30","Yatsi":"22:56"},{"Aksam":"21:37","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/d2.gif","Gunes":"05:14","GunesBatis":"21:30","GunesDogus":"05:21","HicriTarihKisa":"16.10.1441","HicriTarihUzun":"16 Şevval 1441","Ikindi":"17:47","Imsak":"03:44","KibleSaati":"11:24","MiladiTarihKisa":"08.06.2020","MiladiTarihKisaIso8601":"08.06.2020","MiladiTarihUzun":"08 Haziran 2020 Pazartesi","MiladiTarihUzunIso8601":"2020-06-08T00:00:00.0000000+03:00","Ogle":"13:30","Yatsi":"22:57"},{"Aksam":"21:38","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/d3.gif","Gunes":"05:13","GunesBatis":"21:31","GunesDogus":"05:20","HicriTarihKisa":"17.10.1441","HicriTarihUzun":"17 Şevval 1441","Ikindi":"17:47","Imsak":"03:43","KibleSaati":"11:24","MiladiTarihKisa":"09.06.2020","MiladiTarihKisaIso8601":"09.06.2020","MiladiTarihUzun":"09 Haziran 2020 Salı","MiladiTarihUzunIso8601":"2020-06-09T00:00:00.0000000+03:00","Ogle":"13:31","Yatsi":"22:58"},{"Aksam":"21:38","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/d4.gif","Gunes":"05:13","GunesBatis":"21:31","GunesDogus":"05:20","HicriTarihKisa":"18.10.1441","HicriTarihUzun":"18 Şevval 1441","Ikindi":"17:48","Imsak":"03:43","KibleSaati":"11:25","MiladiTarihKisa":"10.06.2020","MiladiTarihKisaIso8601":"10.06.2020","MiladiTarihUzun":"10 Haziran 2020 Çarşamba","MiladiTarihUzunIso8601":"2020-06-10T00:00:00.0000000+03:00","Ogle":"13:31","Yatsi":"22:58"},{"Aksam":"21:39","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/d5.gif","Gunes":"05:13","GunesBatis":"21:32","GunesDogus":"05:20","HicriTarihKisa":"19.10.1441","HicriTarihUzun":"19 Şevval 1441","Ikindi":"17:48","Imsak":"03:43","KibleSaati":"11:25","MiladiTarihKisa":"11.06.2020","MiladiTarihKisaIso8601":"11.06.2020","MiladiTarihUzun":"11 Haziran 2020 Perşembe","MiladiTarihUzunIso8601":"2020-06-11T00:00:00.0000000+03:00","Ogle":"13:31","Yatsi":"22:59"},{"Aksam":"21:40","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/d6.gif","Gunes":"05:12","GunesBatis":"21:33","GunesDogus":"05:20","HicriTarihKisa":"20.10.1441","HicriTarihUzun":"20 Şevval 1441","Ikindi":"17:48","Imsak":"03:43","KibleSaati":"11:26","MiladiTarihKisa":"12.06.2020","MiladiTarihKisaIso8601":"12.06.2020","MiladiTarihUzun":"12 Haziran 2020 Cuma","MiladiTarihUzunIso8601":"2020-06-12T00:00:00.0000000+03:00","Ogle":"13:31","Yatsi":"22:59"},{"Aksam":"21:40","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sondordun.gif","Gunes":"05:12","GunesBatis":"21:33","GunesDogus":"05:19","HicriTarihKisa":"21.10.1441","HicriTarihUzun":"21 Şevval 1441","Ikindi":"17:49","Imsak":"03:43","KibleSaati":"11:26","MiladiTarihKisa":"13.06.2020","MiladiTarihKisaIso8601":"13.06.2020","MiladiTarihUzun":"13 Haziran 2020 Cumartesi","MiladiTarihUzunIso8601":"2020-06-13T00:00:00.0000000+03:00","Ogle":"13:31","Yatsi":"22:59"},{"Aksam":"21:41","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd1.gif","Gunes":"05:12","GunesBatis":"21:34","GunesDogus":"05:19","HicriTarihKisa":"22.10.1441","HicriTarihUzun":"22 Şevval 1441","Ikindi":"17:49","Imsak":"03:43","KibleSaati":"11:26","MiladiTarihKisa":"14.06.2020","MiladiTarihKisaIso8601":"14.06.2020","MiladiTarihUzun":"14 Haziran 2020 Pazar","MiladiTarihUzunIso8601":"2020-06-14T00:00:00.0000000+03:00","Ogle":"13:32","Yatsi":"23:00"},{"Aksam":"21:41","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd2.gif","Gunes":"05:12","GunesBatis":"21:34","GunesDogus":"05:19","HicriTarihKisa":"23.10.1441","HicriTarihUzun":"23 Şevval 1441","Ikindi":"17:49","Imsak":"03:43","KibleSaati":"11:27","MiladiTarihKisa":"15.06.2020","MiladiTarihKisaIso8601":"15.06.2020","MiladiTarihUzun":"15 Haziran 2020 Pazartesi","MiladiTarihUzunIso8601":"2020-06-15T00:00:00.0000000+03:00","Ogle":"13:32","Yatsi":"23:00"},{"Aksam":"21:42","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd3.gif","Gunes":"05:12","GunesBatis":"21:35","GunesDogus":"05:19","HicriTarihKisa":"24.10.1441","HicriTarihUzun":"24 Şevval 1441","Ikindi":"17:49","Imsak":"03:44","KibleSaati":"11:27","MiladiTarihKisa":"16.06.2020","MiladiTarihKisaIso8601":"16.06.2020","MiladiTarihUzun":"16 Haziran 2020 Salı","MiladiTarihUzunIso8601":"2020-06-16T00:00:00.0000000+03:00","Ogle":"13:32","Yatsi":"23:00"},{"Aksam":"21:42","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd4.gif","Gunes":"05:12","GunesBatis":"21:35","GunesDogus":"05:19","HicriTarihKisa":"25.10.1441","HicriTarihUzun":"25 Şevval 1441","Ikindi":"17:50","Imsak":"03:44","KibleSaati":"11:27","MiladiTarihKisa":"17.06.2020","MiladiTarihKisaIso8601":"17.06.2020","MiladiTarihUzun":"17 Haziran 2020 Çarşamba","MiladiTarihUzunIso8601":"2020-06-17T00:00:00.0000000+03:00","Ogle":"13:32","Yatsi":"23:01"},{"Aksam":"21:43","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd5.gif","Gunes":"05:12","GunesBatis":"21:36","GunesDogus":"05:19","HicriTarihKisa":"26.10.1441","HicriTarihUzun":"26 Şevval 1441","Ikindi":"17:50","Imsak":"03:44","KibleSaati":"11:28","MiladiTarihKisa":"18.06.2020","MiladiTarihKisaIso8601":"18.06.2020","MiladiTarihUzun":"18 Haziran 2020 Perşembe","MiladiTarihUzunIso8601":"2020-06-18T00:00:00.0000000+03:00","Ogle":"13:32","Yatsi":"23:01"},{"Aksam":"21:43","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd6.gif","Gunes":"05:12","GunesBatis":"21:36","GunesDogus":"05:19","HicriTarihKisa":"27.10.1441","HicriTarihUzun":"27 Şevval 1441","Ikindi":"17:50","Imsak":"03:44","KibleSaati":"11:28","MiladiTarihKisa":"19.06.2020","MiladiTarihKisaIso8601":"19.06.2020","MiladiTarihUzun":"19 Haziran 2020 Cuma","MiladiTarihUzunIso8601":"2020-06-19T00:00:00.0000000+03:00","Ogle":"13:33","Yatsi":"23:01"},{"Aksam":"21:43","AyinSekliURL":"https://namazvakti.diyanet.gov.tr/images/sd7.gif","Gunes":"05:12","GunesBatis":"21:36","GunesDogus":"05:19","HicriTarihKisa":"28.10.1441","HicriTarihUzun":"28 Şevval 1441","Ikindi":"17:50","Imsak":"03:44","KibleSaati":"11:28","MiladiTarihKisa":"20.06.2020","MiladiTarihKisaIso8601":"20.06.2020","MiladiTarihUzun":"20 Haziran 2020 Cumartesi","MiladiTarihUzunIso8601":"2020-06-20T00:00:00.0000000+03:00","Ogle":"13:33","Yatsi":"23:01"}];
    		localStorage.setItem('salatTimes', salatTimes);
    		callBack(data[now.getDate()-1]);
    	} else {
    		console.log('has already data');
    		var salatTimesOfTheDay = salatTimes[now.getDate()-1];
    		var currentDate = new Date(salatTimesOfTheDay['MiladiTarihUzunIso8601']);
    		console.log('currentDate:', currentDate);
    		console.log('now:', now);
    		if (currentDate.getYear() == now.getYear() 
    				&& currentDate.getMonth() == now.getMonth() 
    				&& currentDate.getDate() == now.getDate()) {
    			console.log('has the right date for today');
    			callBack(salatTimesOfTheDay);
    		} else {
    			console.log('has the wrong date for today, get new data');
    			getSalatTimesForCurrentMonth(function(data) {
    				localStorage.setItem('salatTimes', data);
    				callBack(data[now.getDate()-1]);	
    			});
    		}
    	}
    	*/
    }
    
    
    /**
     * Initializes the application.
     * @private
     */
    function init() {
    	getSalatTimes(function(data) {
    		setDataToView(data);
    	});
    }

    // The function "init" will be executed after the application successfully loaded.
    window.onload = init;
}());