"use strict";
var KTDatatablesSearchOptionsAdvancedSearch = function() {

	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});

	var initTable1 = function() {
		// begin first table
		var table = $('#tbl_list_verifikasi_praktikum').DataTable({
			responsive: true,
			// Pagination settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			// read more: https://datatables.net/examples/basic_init/dom.html

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,

			language: {
				'lengthMenu': 'Display _MENU_',
			},

			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: {
				url: '../source/verifikasi_praktikum.json',
				type: 'POST',
				
			},
			columns: [
				{data: 'no'},
				{data: 'nim'},
				{data: 'nama'},
				{data: 'nama_praktikum'},
				{data: 'semester'},
				{data: 'tahun_ajaran'},
				{data: 'status',responsivePriority: -1},
				{data: 'aksi'},
			],

			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

				
				});
			},

			columnDefs: [
				{
					targets: -1,
					title: 'Aksi',
					className: 'text-center',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="rincian_verifikasi_praktikum.html" class="btn btn-sm btn-warning" style="color:#212121;">Rincian</a>`;
					},
				},
				{
					targets: [0, 1, 2, 3, 4,5,6],
					className: 'text-center'
				},
				{
					targets: 6,
					width: 220,
					render: function(data, type, full, meta) {
						var status = {
							terverifikasi: {'title': 'Terverifikasi', 'class': ' btn-label-success'},
							belum: {'title': 'Belum Terverifikasi', 'class': 'btn-label-danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
					},
				},
			],
		});

		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
		};

		var asdasd = function(value, index) {
			var val = $.fn.dataTable.util.escapeRegex(value);
			table.column(index).search(val ? val : '', false, true);
		};

		$('#kt_search').on('click', function(e) {
			e.preventDefault();
			var params = {};
			$('.kt-input').each(function() {
				var i = $(this).data('col-index');
				if (params[i]) {
					params[i] += '|' + $(this).val();
				}
				else {
					params[i] = $(this).val();
				}
			});
			$.each(params, function(i, val) {
				// apply search params to datatable
				table.column(i).search(val ? val : '', false, false);
			});
			table.table().draw();
		});

		$('#kt_reset').on('click', function(e) {
			e.preventDefault();
			$('.kt-input').each(function() {
				$(this).val('');
				table.column($(this).data('col-index')).search('', false, false);
			});
			table.table().draw();
		});

		$('#kt_datepicker').datepicker({
			todayHighlight: true,
			templates: {
				leftArrow: '<i class="la la-angle-left"></i>',
				rightArrow: '<i class="la la-angle-right"></i>',
			},
		});

	};
	
	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesSearchOptionsAdvancedSearch.init();
});