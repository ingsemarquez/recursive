/**
 * @author semarquez
 * @version 1.1.1
 * date: 09/07/2015, 04/08/2015, 05/11/2015, 13/01/2016
 * desc: framework de javascript 
 */

(function(window){
	
	/**
	 * variables privadas
	 */
	var _company = 'Recursive Technologies de Mexico S.A. de C.V.';
	var _appName = 'AnanaJS';
	var _version = '1.0.1';
	var _bError = false;
	var _sBaseUrl = '';
	var _sMsgStack = '';
	var _sMsgSaveSuccess = 'El registro fue guardado exitosamente';
	var _sMsgSaveFail = 'Ha ocurrido un error al tratar de guardar el registro';
	var _sMsgFormIncomplete = 'Existen campos incompletos, favor de verificar los campos en color rojo';
	var _sMsgPasswDiff = 'Las contraseñas proprcionadas no coinciden';
	var _sMsgDateMinMayError = 'La fecha inicial debe de ser menor que la fecha final';
	var _sMsgWrongEmail = 'El email ingresado no es válido';
	var _sMsgServerProcessError = 'Ha ocurrido un error al procesar la solicitud por el servidor';
	var _sMsgNoAccessAllowed = 'No cuentas con los privilegios para realizar esta acción';
	var _sMsgBadParams = 'Error, no se obtuvieron los parametros correctamente';
	var _emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	var _csrfName = undefined; 
	var _csrfHash = undefined;
	
	
	/**
	 * metodos privados 
	 */
	var fnSetErrorModal = function(){
		var modal = '<div id="rcsJsErrorModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="rcsFwErrorLabel">'
				  +   '<div class="modal-dialog modal-sm">'
				  + 	'<div class="modal-content">'
				  +			'<div class="modal-header">'
				  +				'<h4 style="color:red">¡Error!</h4>'
				  +			'</div>'
				  +			'<div class="modal-body">'
				  +				'<p>Mensaje de Error</p>'
				  +			'</div>'
				  +			'<div class="modal-footer">'
				  +				'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
				  +			'</div>'
				  +		'</div>'
				  +	  '</div>'
				  +	'</div>';
		
		$('body').append(modal);
		
	}; 
	//end of method
	
	var fnSetDeactivateModal = function(sLabel){
		var label = sLabel ? sLabel : 'Elemento';
		
		var modal = '<div id="rcsJsDeactivateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="rcsFwDeactivateLabel">'
				  +   '<div class="modal-dialog">'
				  + 	'<div class="modal-content">'
				  +			'<div class="modal-header">'
				  +				'<h4 class="modal-title">Desactivar ' + label + '</h4>'
				  +			'</div>'
				  +			'<div class="modal-body">'
				  +				'<h4>¿Desea Desactivar el '+ label +' Seleccionado?</h4>'
		  		  +				'<input type="hidden" id="idToDeactivate" value="" />'
				  +			'</div>'
				  +			'<div class="modal-footer">'
				  +				'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
				  +				'<button type="button" class="btn btn-primary" id="btnDeactivate">Aceptar</button>'
				  +			'</div>'
				  +		'</div>'
				  +	  '</div>'
				  +	'</div>';
		
		$('body').append(modal);
		
	}; 
	//end of method
	
	var fnSetActivateModal = function(sLabel){
		var label = sLabel ? sLabel : 'Elemento';
		
		var modal = '<div id="rcsJsActivateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="rcsFwActivateLabel">'
				  +   '<div class="modal-dialog">'
				  + 	'<div class="modal-content">'
				  +			'<div class="modal-header">'
				  +				'<h4 class="modal-title">Activar ' + label + '</h4>'
				  +			'</div>'
				  +			'<div class="modal-body">'
				  +				'<h4>¿Desea Activar el '+ label +' Seleccionado?</h4>'
		  		  +				'<input type="hidden" id="idToActivate" value="" />'
				  +			'</div>'
				  +			'<div class="modal-footer">'
				  +				'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
				  +				'<button type="button" class="btn btn-primary" id="btnActivate">Aceptar</button>'
				  +			'</div>'
				  +		'</div>'
				  +	  '</div>'
				  +	'</div>';
		
		$('body').append(modal);
		
	}; 
	//end of method
	
	var fnSetAuthorizeModal = function(sLabel){
		var label = sLabel ? sLabel : 'Elemento';
		
		var modal = '<div id="rcsJsAuthorizeModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="rcsFwAuthorizeLabel">'
				  +   '<div class="modal-dialog">'
				  + 	'<div class="modal-content">'
				  +			'<div class="modal-header">'
				  +				'<h4 class="modal-title">Autorizar ' + label + '</h4>'
				  +			'</div>'
				  +			'<div class="modal-body">'
				  +				'<h4>¿Desea Autorizar el '+ label +' Seleccionado?</h4>'
		  		  +				'<input type="hidden" id="idToAuthorize" value="" />'
				  +			'</div>'
				  +			'<div class="modal-footer">'
				  +				'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
				  +				'<button type="button" class="btn btn-primary" id="btnAuthorize">Aceptar</button>'
				  +			'</div>'
				  +		'</div>'
				  +	  '</div>'
				  +	'</div>';
		
		$('body').append(modal);
		
	}; 
	//end of method
	
	var fnSetTerminateModal = function(sLabel){
		var label = sLabel ? sLabel : 'Elemento';
		
		var modal = '<div id="rcsJsTerminateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="rcsFwTerminateLabel">'
				  +   '<div class="modal-dialog">'
				  + 	'<div class="modal-content">'
				  +			'<div class="modal-header">'
				  +				'<h4 class="modal-title">Terminate ' + label + '</h4>'
				  +			'</div>'
				  +			'<div class="modal-body">'
				  +				'<h4>¿Desea Terminar el '+ label +' Seleccionado?</h4>'
		  		  +				'<input type="hidden" id="idToTerminate" value="" />'
				  +			'</div>'
				  +			'<div class="modal-footer">'
				  +				'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
				  +				'<button type="button" class="btn btn-primary" id="btnTerminate">Aceptar</button>'
				  +			'</div>'
				  +		'</div>'
				  +	  '</div>'
				  +	'</div>';
		
		$('body').append(modal);
		
	}; 
	//end of method
	
	var fnCleanMessages = function(){
		//clean msgs
		$('div#success').html('');
		$('div#error').html('');
	};
	//end of method
	
	var fnShowMessage = function(sStatus, sMsg){
		fnCleanMessages();
		
		if(sStatus != ''){ 
			//if exists estatus show messages
			if(sStatus == 'true'){
				$('div#error').css('display', 'none');
				$('div#success').css('display', 'block');
				$('div#success').html(sMsg);
			}
			if(sStatus == 'false'){
				$('div#success').css('display', 'none');
				$('div#error').css('display', 'block');
				$('div#error').html(sMsg);
			}
		}
		else{ 
			//not show any messages
			$('div#error').css('display', 'none');
			$('div#success').css('display', 'none');
		}
	}; 
	//end of method
	
	var fnShowErrorModal = function(sMsg){
		$('#rcsJsErrorModal .modal-body').html(sMsg);
		$('#rcsJsErrorModal').modal('show');
		
	}; 
	//end of method
	
	var fnSetDatepickersDefaults = function(){
		$.datepicker.regional['es'] = {
			 closeText: 'Cerrar',
			 prevText: '<Ant',
			 nextText: 'Sig>',
			 currentText: 'Hoy',
			 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
			 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
			 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
			 weekHeader: 'Sm',
			 dateFormat: 'dd/mm/yy',
			 firstDay: 1,
			 isRTL: false,
			 showMonthAfterYear: false,
			 yearSuffix: ''
		 };
		 
		 $.datepicker.setDefaults($.datepicker.regional['es']);
	}; 
	//end of method
	
	var fnSetTimepickerDefaults = function(){
		$.timepicker.regional['es'] = {
			timeOnlyTitle: 'Elegir Hora',
			timeText: 'Tiempo',
			hourText: 'Hora',
			minuteText: 'Minutos',
			secondText: 'Segundos',
			millisecText: 'Milisegundos',
			timezoneText: 'Zona Horaria',
			currentText: 'Hoy',
			closeText: 'Aceptar',
			timeFormat: 'HH:mm',
			amNames: ['AM', 'A'],
			pmNames: ['PM', 'P'],
			isRTL: false
		};
		
		$.timepicker.setDefaults($.timepicker.regional['es']);
	};
	//end of method

	var fnRequired = function(){
		//('input, select')
		$('form').find('.Required').each(function(){ 
			if($(this).val() == undefined || $(this).val() == ''){
				$(this).parent().addClass('has-error');
				_bError = true;
			}
			else{
				//remove error
				$(this).parent().removeClass('has-error'); 
			}
		});
		
		if(_bError){
			_sMsgStack += _sMsgFormIncomplete + '<br>';
		}
		
	}; 
	//end of method
	
	var fnValidatePassEquality = function(){
		var ele1 = $('form').find('.Equals1');
		var ele2 = $('form').find('.Equals2');
		
		if($(ele1).val() != '' && $(ele2).val() != ''){
			if($(ele1).val() != $(ele2).val()){
				$(ele1).parent().addClass('has-error');
				$(ele2).parent().addClass('has-error');
				_sMsgStack += _sMsgPasswDiff + '<br>';
				_bError = true;
			} 
			else{
				$(ele1).parent().removeClass('has-error');
				$(ele2).parent().removeClass('has-error');
			}
		}
	}; 
	//end of method
	
	var fnValidateRegex = function(object, regex){
		if(regex.test( $(object).val() )) {
			$(object).parent().removeClass('has-error');
			return false;
		}
		else{
			$(object).parent().addClass('has-error'); 
			return true;
		}
	}; //end of method
	
	var fnValidateEmail = function() {
		$('form').find('.Email').each(function(){
			if(fnValidateRegex(this, _emailRegex)){
				_sMsgStack += _sMsgWrongEmail + '<br>';
				_bError = true;
			}
		});
  	}; 
  	//end of method 
	
	var fnValidateMinMayDates = function(){
		var ele1 = $('form').find('.iDate');
		var ele2 = $('form').find('.fDate');
		
		if($(ele1).val() != '' && $(ele2).val() != ''){
			if($(ele1).val() > $(ele2).val()){
				$(ele1).parent().addClass('has-error');
				$(ele2).parent().addClass('has-error');
				_sMsgStack += _sMsgDateMinMayError + '<br>';
				_bError = true;
			} 
			else{
				$(ele1).parent().removeClass('has-error');
				$(ele2).parent().removeClass('has-error');
			}
		}
	}; 
	//end of method
	
	var fnOnlyNumbers = function(object){
		$(object).keydown(function(event) {
			if(event.shiftKey) {
				event.preventDefault();
		  	}
		 		
			if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 110){
				//nothing to do here	
			}
			else {
				if (event.keyCode < 95) {
				  	if (event.keyCode < 48 || event.keyCode > 57) {
				        event.preventDefault();
				  	}
				} 
				else {
					if (event.keyCode < 96 || event.keyCode > 105) {
						event.preventDefault();
			      	}
				}
			}
			
			//regex tester ^-?(\d+)(\.\d+)?$
		});
	}; 
	// end of method
	
	var fnOnlyIntegers = function(object){
		$(object).keydown(function(event) {
		    if(event.shiftKey) {
				event.preventDefault();
		    }
		 		
		    if (event.keyCode == 8 || event.keyCode == 9) {
		   		//nothing to do here
		    }
		    else {
				if (event.keyCode < 95) {
				  	if (event.keyCode < 48 || event.keyCode > 57) {
				        event.preventDefault();
				  	}
				} 
				else {
		    	    if (event.keyCode < 96 || event.keyCode > 105) {
		        	    event.preventDefault();
				  	}
				}
	      	}
   		});
	}; 
	// end of method
	
	var fnOnly2Decimals = function(object){
		if($.isNumeric($(object).val())){
			var fValue = parseFloat($(object).val());
			$(object).val(fValue.toFixed(2));
		}
	}; 
	// end of method
	
	var fnOnSubmit = function(sMode, sMsg){
		//clean error
		_bError = false;
		//clean messages stack
		_sMsgStack = '';
				
		//validate required fields
		fnRequired();
		//validate equality in fields
		fnValidatePassEquality();
		//validate date initial vs final
		fnValidateMinMayDates();
		//validate email regex
		fnValidateEmail();
		
		if(_bError){
			if(sMode){
				switch(sMode){
					//in div custom msg
					case 0: 
						fnShowMessage('false', sMsg);
					break;
						
					//in modal custom msg	
					case 1: 
						fnShowErrorModal(sMsg);
					break;
				}
			}
			else{
				fnShowMessage('false', _sMsgStack);
			}
			
			return false;
		}
		else{
			return true;	
		}
	}; 
	//end of method
	
	var fnSetStatusByAjax = function(nId, sUrl, sModalID){
		
		var sHelper = '{ "id" : "' + nId + '", ' + 
					  '"' + _csrfName + '" : "' + _csrfHash + '" }';
		
		$.ajax({
	        url: sUrl,
	        type: 'post',
	        data: JSON.parse(sHelper),
	        dataType: 'json', 
	        cache: false,
	        error: function(request, status, error){
	            $(sModalID).modal('hide');
	            fnShowErrorModal('<h3>Error: ' + error + '</h3>');
	            console.log('Error: ' + error + ', ' + _appName + ' ' + _version + ' ' + _company);
	        }, 
	        //end error
	        success: function(data){
	        	if(data == '0') {
	        		$(sModalID).modal('hide');
	        		fnShowErrorModal('<h3>' + _sMsgServerProcessError + '</h3>');
	        		console.log('Error: Ha ocurrido un error al procesar la solicitud por el servidor, ' + _appName + ' ' + _version + ' ' + _company);
	        	} 
	        	else if(data == '-1') {
	        		$(sModalID).modal('hide');
	        		fnShowErrorModal('<h3>' + _sMsgNoAccessAllowed + '</h3>');
	        	}
	        	else {
	        		location.reload();
	        	}
	        	//end if
	        } 
	        //end success
	 	});
	}; 
	//end of method
	
	var fnSetActivateAjax = function(nId, sActivateUrl, sModalID){
		fnSetStatusByAjax(nId, sActivateUrl, sModalID);
	}; 
	//end of method
	
	var fnSetDeactivateAjax = function(nId, sDeactivateUrl, sModalID){
		fnSetStatusByAjax(nId, sDeactivateUrl, sModalID);
	}; 
	//end of method

	var fnSetAuthorizeAjax = function(nId, sAuthorizeUrl, sModalID){
		fnSetStatusByAjax(nId, sAuthorizeUrl, sModalID);
	}; 
	//end of method

	var fnSetTerminateAjax = function(nId, sTerminateUrl, sModalID){
		fnSetStatusByAjax(nId, sTerminateUrl, sModalID);
	}; 
	//end of method


	/**
	 * metodos publicos 
	 */
	window.Anana = {
		//onload event
		initialize : function(sUrl) 
		{	
			//set base url
			if(sUrl != '' && sUrl != undefined) {
				_sBaseUrl = sUrl;
			}
			
			//set error modal
			fnSetErrorModal();
			//activate all tooltips
			$('[data-toggle="tooltip"]').tooltip();
			//activate all combobox
			$('select.combobox').combobox();
			
			//set default config
			fnSetDatepickersDefaults();
			fnSetTimepickerDefaults();
			
			//datepickers are readonly
			$('input.datepicker').attr('readonly', 'readonly');
			$('input.timepicker').attr('readonly', 'readonly');
			$('input.datetimepicker').attr('readonly', 'readonly');
			
			//config datepicker
			$('input.datepicker').datepicker({
				showOn: "button",
				buttonImage: (_sBaseUrl != '') ? sUrl + "/public/img/calendar-blue.png" : "../public/img/calendar-blue.png",
		        buttonImageOnly: true,
		        buttonText: "Select date",
				minDate: "-1Y",
				maxDate: "+1Y",
				dateFormat: "yy-mm-dd"
			}); 
			//activate all datepickers
			
			//config datetimepicker
			$('input.datetimepicker').datetimepicker({
				showOn: "button",
				buttonImage: (_sBaseUrl != '') ? sUrl + "/public/img/calendar-blue.png" : "../public/img/calendar-blue.png",
		        buttonImageOnly: true,
		        buttonText: "Select date",
				minDate: "-1Y",
				maxDate: "+1Y",
				dateFormat: "yy-mm-dd"
			});
			
			//config timepicker
			$('input.timepicker').timepicker();
		}, 
		//end of method
		
		showMessages : function(sStatus, sMsg) {
			//custom msg
			if(sMsg){
				fnShowMessage(sStatus, sMsg);
			}
			else{
				if(sStatus == 'true')
					fnShowMessage('true', _sMsgSaveSuccess);
				else if(sStatus == 'false')
					fnShowMessage('false', _sMsgSaveFail);
				else
					fnShowMessage('');
			}
			
		}, 
		//end of method
		
		validateForms : function(sMode, sMsg) {
			//solo numeros (enteros)
			fnOnlyIntegers($('input.Integers')); 
			//solo numeros (reales)
			fnOnlyNumbers($('input.Numbers')); 
			
			//dejar en 2 decimales los campos numericos
			$('input.TwoDecimals').blur(function(){ 
				fnOnly2Decimals(this);
			});
			
			//eliminar posibilidad de hacer submit al presionar enter en formularios
			$("form").keypress(function(e) { 
			    if (e.which == 13) {
			        return false;
			    }
			});
			
			//add security
			$("button.Submit").click(function(){ 
				$("form").submit();	
			});
			
			//previene el submit si hay error
			$('form').submit(function(e){
				//e.preventDefault();
				return fnOnSubmit(sMode, sMsg);
			});
			
		}, 
		//end of method
		
		validateModals : function(object)
		{
			//to define...
		},
		//end of method
		
		deactivateListHelper : function(sLabel, sUrl) {
			//set deactivate modal & label for customize
			fnSetDeactivateModal(sLabel); 
			
			//add callback ajax
			$('#rcsJsDeactivateModal button#btnDeactivate').click(function(){ 
	       		fnSetDeactivateAjax($('#rcsJsDeactivateModal').find('.modal-body input#idToDeactivate').val(), sUrl, '#rcsJsDeactivateModal');
		    });
		}, 
		//end of method
		
		activateListHelper : function(sLabel, sUrl) {
			//set activate modal & label for customize
			fnSetActivateModal(sLabel); 
			
			//add callback ajax
		    $('#rcsJsActivateModal button#btnActivate').click(function(){ 
	       		fnSetActivateAjax($('#rcsJsActivateModal').find('.modal-body input#idToActivate').val(), sUrl, '#rcsJsActivateModal');
		    });
		    
		}, 
		//end of method
		
		authorizeListHelper : function(sLabel, sUrl) {
			//set authorze modal & label for customize
			fnSetAuthorizeModal(sLabel); 
			
			//add callback ajax
		    $('#rcsJsAuthorizeModal button#btnAuthorize').click(function(){ 
	       		fnSetAuthorizeAjax($('#rcsJsAuthorizeModal').find('.modal-body input#idToAuthorize').val(), sUrl, '#rcsJsAuthorizeModal');
		    });
		    
		}, 
		//end of method
		
		terminateListHelper : function(sLabel, sUrl) {
			//set terminate modal & label for customize
			fnSetTerminateModal(sLabel); 
			
			//add callback ajax
		    $('#rcsJsTerminateModal button#btnTerminate').click(function(){ 
	       		fnSetTerminateAjax($('#rcsJsTerminateModal').find('.modal-body input#idToTerminate').val(), sUrl, '#rcsJsTerminateModal');
		    });
		    
		}, 
		//end of method
		
		showDeactivateModal : function(idToDeactivate) {
			$('#rcsJsDeactivateModal').find('.modal-body input#idToDeactivate').val(idToDeactivate);
			$('#rcsJsDeactivateModal').modal('show');
    		
		}, 
		//end of method
		
		showActivateModal : function(idToActivate) {
			$('#rcsJsActivateModal').find('.modal-body input#idToActivate').val(idToActivate);
			$('#rcsJsActivateModal').modal('show');
    		
		}, 
		//end of method
		
		showAuthorizeModal : function(idToAuthorize) {
			$('#rcsJsAuthorizeModal').find('.modal-body input#idToAuthorize').val(idToAuthorize);
			$('#rcsJsAuthorizeModal').modal('show');
    		
		}, 
		//end of method
		
		showTerminateModal : function(idToTerminate) {
			$('#rcsJsTerminateModal').find('.modal-body input#idToTerminate').val(idToTerminate);
			$('#rcsJsTerminateModal').modal('show');
    		
		}, 
		//end of method
		
		exportHelper : function(sUrl){
			$('button.Export').click(function(){
				var lastAction = $('form').attr('action');
				
				$('form').attr('action', sUrl);
				$('form').submit();
				
				$('form').submit(function(){
					//previene el submit si hay error
					return fnOnSubmit();
				});	
				
				$('form').attr('action', lastAction);
			});
			
		}, 
		//end of method
		
		chartHelper : function(oOptions){
			if(oOptions){
				var ctx = document.getElementById(oOptions.canvas).getContext("2d");
				
				switch(oOptions.chartType){
					case 'Pie':
						var myPieChart = new Chart(ctx).Pie(oOptions.data, oOptions.options);
						console.log(myPieChart);
						break;
						
					case 'Line':
						var myLineChart = new Chart(ctx).Line(oOptions.data, oOptions.options);
						break;
						
					case 'Bar':
						var myBarChart = new Chart(ctx).Bar(oOptions.data, oOptions.options);
						break;
						
					case 'Radar':
						var myRadarChart = new Chart(ctx).Radar(oOptions.data, oOptions.options);
						break;	
						
					case 'Polar':
						var myBarChart = new Chart(ctx).PolarArea(oOptions.data, oOptions.options);
						break;	
						
					case 'Doughnut':
						var myBarChart = new Chart(ctx).Doughnut(oOptions.data, oOptions.options);
						break;
						
					default:
						console.log('Error: No existe el tipo de gráfica solicitado, ' + _appName + ' ' + _version + ' ' + _company);
				}	
			//if exist options	
			}
			else{
				console.log('Error: ' + _sMsgBadParams + ', ' + _appName + ' ' + _version + ' ' + _company);
			}
			
		}, 
		//end of method
		
		ajaxHelper : function(sUrl, sData, fnCallBack, fnCallBackError) {
			$.ajax({
		        url: sUrl,
		        type: 'post',
		        data: sData,
		        dataType: 'json', 
		        cache: false,
		        error: function(request, status, error){
	        		if(fnCallBackError){
		            	fnCallBackError(request, status, error);
		           	}
		           	else {
		           		fnShowErrorModal('Ha ocurrido un error: ' + error + ', Contacte con el administrador por favor');
		           		console.log('No se definio ningun metodo para el callback error! ' + _appName + ' ' + _version + ' ' + _company);
		           	}
		        },
		        success: function(data){
		        	if(fnCallBack){
		        		fnCallBack(data);
		        	}
		        	else{
		        		console.log('No se definio ningun metodo para el callback success! ' + _appName + ' ' + _version + ' ' + _company);
		        	}
		        }
		 	});
		 	
		}, 
		//end of method
		
		//security add semarquez 31/08/2015
		setCSRF : function(name, hash){ 
			if(name && hash){
				_csrfName = name;
				_csrfHash = hash;
			}
		}, 
		//end of method
		
		/*
		 * @deprecated 
		 *getCSRF : function(){
			if(_csrfName != "" && _csrfHash != ""){
				return [_csrfName, _csrfHash];
			}
			
			return [];
		},*/  
		
		// 23/02/2016
		//require! moment js
		collitionDates : function(idt, fdt, ridt, rfdt)
		{
			var collition = false;
			
			if(!idt.isSame(ridt) && !fdt.isSame(rfdt))
			{
				if(idt.isBetween(ridt, rfdt))
					collition = true;
					
				if(fdt.isBetween(ridt, rfdt))
					collition = true;
			}
			else
			{
				collition = true;
			}
			
			return collition;
			//return (((idt > ridt && idt > rfdt) && (fdt > ridt && fdt > rfdt)) || ((idt < ridt && idt < rfdt) && (fdt < ridt && fdt < rfdt)) ? true : false);
		}
		//end of method
		
	};
	
}(window));
//end of framework