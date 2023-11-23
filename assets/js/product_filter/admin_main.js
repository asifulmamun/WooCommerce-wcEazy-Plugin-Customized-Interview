
function wceazy_product_filter_init(host){
    wceazy_hide_all()
    jQuery("#wceazy_product_filter").show();

    wceazy_product_filter_tab_init();
}

function wceazy_product_filter_copy_shortcode(){
    'use strict';

    var temp = jQuery("<input>");
    jQuery("body").append(temp);
    temp.val(jQuery(".wceazy_product_filter_copy_shortcode").text()).select();
    document.execCommand("copy");
    temp.remove();
    alert("Shortcode Copied to Clipboard")
}


function wceazy_product_filter_tab_init(){
    jQuery(".wceazy_product_filter_container .coupon_tab_body").hide();
    jQuery(".wceazy_product_filter_container .coupon_tab_body[data-id='tab_general']").show();
    jQuery(".wceazy_product_filter_container .coupon_data_tabs .tab_item").unbind("click");
    jQuery(".wceazy_product_filter_container .coupon_data_tabs .tab_item").bind("click", function () {
        jQuery(".wceazy_product_filter_container .coupon_data_tabs .tab_item").removeClass('tab_item_active');
        jQuery(this).addClass('tab_item_active');
        jQuery(".wceazy_product_filter_container .coupon_tab_body").hide();
        jQuery(".wceazy_product_filter_container .coupon_tab_body[data-id='" + jQuery(this).data('target') + "']").show();
    });
}



function wceazy_product_filter_save(updatedOrder) {
    jQuery('.wceazy_product_filter_bottom_button_section button').text('Please Wait..');
    jQuery('.wceazy_product_filter_bottom_button_section button').prop('disabled', true);
    let jQuerypostData = {

        // sequence filter data
        'updatedOrder': updatedOrder,

        'show_search_filter': jQuery(".wceazy_product_filter_show_search_filter input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'show_price_filter': jQuery(".wceazy_product_filter_show_price_filter input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'show_rating_filter': jQuery(".wceazy_product_filter_show_rating_filter input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'show_category_filter': jQuery(".wceazy_product_filter_show_category_filter input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'show_stock_filter': jQuery(".wceazy_product_filter_show_stock_filter input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'sidebar_position': jQuery(".wceazy_product_filter_sidebar_position select").val(),

        'product_per_page': jQuery(".wceazy_product_filter_product_per_page input").val(),
        'add_to_cart_btn_text': jQuery(".wceazy_product_filter_add_to_cart_btn_text input").val(),
        'select_options_btn_text': jQuery(".wceazy_product_filter_select_options_btn_text input").val(),
        'stock_out_btn_text': jQuery(".wceazy_product_filter_stock_out_btn_text input").val(),
        'prev_btn_text': jQuery(".wceazy_product_filter_prev_btn_text input").val(),
        'next_btn_text': jQuery(".wceazy_product_filter_next_btn_text input").val(),

        'search_filter_label_text': jQuery(".wceazy_product_filter_search_filter_label_text input").val(),
        'search_filter_placeholder_text': jQuery(".wceazy_product_filter_search_filter_placeholder_text input").val(),

        'price_filter_label_text': jQuery(".wceazy_product_filter_price_filter_label_text input").val(),
        'price_filter_min_placeholder_text': jQuery(".wceazy_product_filter_price_filter_min_placeholder_text input").val(),
        'price_filter_max_placeholder_text': jQuery(".wceazy_product_filter_price_filter_max_placeholder_text input").val(),

        'rating_filter_label_text': jQuery(".wceazy_product_filter_rating_filter_label_text input").val(),
        'rating_filter_and_up_text': jQuery(".wceazy_product_filter_rating_filter_and_up_text input").val(),
        'rating_filter_show_5_star_rating': jQuery(".wceazy_product_filter_rating_filter_show_5_star_rating input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'rating_filter_show_4_star_rating': jQuery(".wceazy_product_filter_rating_filter_show_4_star_rating input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'rating_filter_show_3_star_rating': jQuery(".wceazy_product_filter_rating_filter_show_3_star_rating input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'rating_filter_show_2_star_rating': jQuery(".wceazy_product_filter_rating_filter_show_2_star_rating input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'rating_filter_show_1_star_rating': jQuery(".wceazy_product_filter_rating_filter_show_1_star_rating input[type='checkbox']:checked").length > 0 ? "yes" : "no",
        'rating_filter_show_0_star_rating': jQuery(".wceazy_product_filter_rating_filter_show_0_star_rating input[type='checkbox']:checked").length > 0 ? "yes" : "no",

        'category_filter_label_text': jQuery(".wceazy_product_filter_category_filter_label_text input").val(),

        'stock_filter_label_text': jQuery(".wceazy_product_filter_stock_filter_label_text input").val(),
        'stock_filter_in_stock_text': jQuery(".wceazy_product_filter_stock_filter_in_stock_text input").val(),
        'stock_filter_out_stock_text': jQuery(".wceazy_product_filter_stock_filter_out_stock_text input").val(),


    };

    console.log(jQuerypostData);

    let jQuerypost_data = {'action': 'wceazy_product_filter_save', 'data': jQuerypostData};

    jQuery.ajax({
        url: ajaxurl, type: "POST", data: jQuerypost_data,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.status == 'true') {
                Command: toastr["success"]("Settings Saved Successfully!");
                jQuery('.wceazy_product_filter_bottom_button_section button').text('Save Settings');
                jQuery('.wceazy_product_filter_bottom_button_section button').prop('disabled', false);
            } else {
                Command: toastr["error"]("Failed, Please try again!");
                jQuery('.wceazy_product_filter_bottom_button_section button').text('Save Settings');
                jQuery('.wceazy_product_filter_bottom_button_section button').prop('disabled', false);
            }
        }
    });
}



/* 
    * Sequence of filte
    * AL MAMUN
    * hello@asifulmamun.info.bd
*/
// console.log('hello this is admin');
(function($) {
    $(function() {
      var customOrder = {
        'search': 3,
        'price': 2,
        'rating': 1,
        'category': 4,
        'stock': 5
      };
  
      var sortableList = $("#sortable");
  
      function sortItems() {
        var items = sortableList.children('li').detach().toArray();
        items.sort(function(a, b) {
          var aValue = customOrder[$(a).data('item')];
          var bValue = customOrder[$(b).data('item')];
          return aValue - bValue;
        });
        sortableList.append(items);
      }
  
      sortItems();
  
      sortableList.sortable({
        update: function(event, ui) {
          // Sorting logic
        }
      }).disableSelection();
  
      // Handle click on save button
      var isSaving = false; // Flag to prevent double click
      $('.wceazy_product_filter_bottom_button_section button').on('click', function() {
        if (isSaving) return; // If already saving, do nothing
        isSaving = true; // Set saving flag
  
        var updatedOrder = {};
        sortableList.children('li').each(function(index) {
          var itemName = $(this).data('item');
          updatedOrder[itemName] = index + 1;
        });
  
        wceazy_product_filter_save(updatedOrder); // Pass the updatedOrder to the save function
  
        sortableList.sortable('disable'); // Temporarily disable sorting during saving
  
        setTimeout(function() {
          sortItems(); // Resort the list items after saving
          sortableList.sortable('enable'); // Re-enable sorting after saving
          isSaving = false; // Reset the saving flag
        }, 500); // Adjust this timeout according to your needs
      });
    });
  })(jQuery);
