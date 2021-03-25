"use strict";
var is_searching = false;
var is_processing_delayed = false;

$(document).ready(function(){

    function urlParam(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return results[1] || 0;
        }
    }

    if(urlParam('phrase_id')) {
        var element = $(`.translate-phrase-row[phrase-id="${urlParam('phrase_id')}"]`).first();

        if(element) {
            $('html, body').animate({ scrollTop: element.offset().top - element.height() }, 500);
            //console.log('your element',  element.find('textarea'));
            element.find('.save-close-container').css('display', 'flex');
            element.find('.grid-cell-first').css('border-left', '4px solid #29b191');
            element.find('textarea').focus();
        }

    }
    
    var only_untranslated = false;
    // Toggle to show phrases that are translated/untranslated (have empty to_phrase_lang_text )
    $('#show_untranslated').on('change', function() {
        only_untranslated = $(this).is(":checked");
        processingSearch();
    })

    // here we do stuff for search
    $('#search').parent().submit(function(e){
        e.preventDefault(e);
    });
    
    $('#search').on('change paste keyup', function() {
        processingSearch();
     });

     function processingSearch() {

        if (is_processing_delayed) {
            return;
        }

        if(!is_searching) {
            updatePhrases();
        } else {
            is_processing_delayed = true;
            setTimeout(function() {
              is_processing_delayed = false;
              processingSearch();
            }, 100);
        }
     }
     function updatePhrases() {
        is_searching = true;
        var search = $('#search').val().trim().toLowerCase();
        var table_rows = '';
        phrase_langs.forEach(function(pl) {
            var original_phrase = pl.phrase_lang_text.toLowerCase();
            var to_phrase = pl.to_phrase_lang_text ? pl.to_phrase_lang_text.toLowerCase() : null;

            if (only_untranslated && to_phrase){
                return;
            }
            //we're skipping phrases that don't match out search.
            if (search != '' && original_phrase.indexOf(search) < 0 && (!to_phrase || to_phrase.indexOf(search) < 0)) {
                return;
            }

            var template = `
              <div class="translate-phrase-row" phrase-id="${pl.phrase_id}" to-language-code="${pl.to_language_code}" site-id="${pl.site_id}" phrase-lang-words="${pl.phrase_lang_words}">
                <div class="grid-cell-first">
                  <p class="tag-element">&lt;${pl.tag_name}${pl.attribute_name ? ' ' + pl.attribute_name : ''}&gt;</p>
                </div>
                <div class="contains-translation-phrase">
                  <p class="from_text_1 text-for-translation">[${pl.phrase_lang_text}]</p>
                </div>
                <div class="grid-cell-flex-translation">
                  <div class="translation-form w-form">
                    <form id="translate-form" name="wf-form-translate-form" data-name="translate-form" method="post" action="/translate" class="form-3">
                      <div class="contains-textarea-and-buttons">
                        <textarea id="to_text" name="to_text" placeholder="Type your translation here." maxlength="5000" 
                        data-name="to_text" class="to_text-copy translate-in-sheet w-input">${pl.to_phrase_lang_text || ''}</textarea>
                        <div class="save-close-container">
                          <input type="submit" value="Save" data-wait="Please wait..." class="translate-phrase-save w-button">
                          <a href="javascript:;" class="translate-phrase-cancel w-button">Close</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="grid-cell-flex">
                  <div class="updated-time">${pl.updated_ago || ''}</div>
                </div>
              </div>`;
            table_rows += template;
        });
        $('.translator-table-content').html(table_rows);
        setTimeout(function(){
          is_searching = false;
        }, 100);
        // is_searching = false;
        
     }
});

// $(document).on('click', '.translate-phrase-cancel', function(){
//     console.log($(this).parent())
//     $(this).parent().hide();
//     $(this).parent().parent().parent().parent().parent().find('.grid-cell-first').css('border-left', '1px solid #ebebeb');

//     $(this).parent().parent().parent().parent().parent().next().find('.save-close-container').css('display', 'flex');
//     $(this).parent().parent().parent().parent().parent().parent().next().find('.grid-cell-first').css('border-left', '4px solid #29b191');
//     $(this).parent().parent().parent().parent().parent().parent().next().find('textarea').focus();

// });

$(document).on('click', '.contains-textarea-and-buttons', function(){
    $(this).find('textarea').focus();

    $(this).find('.w-input').css('height', '0');
    
    $('.save-close-container').find('.save-close-container').css('cursor', 'text');
    $(this).parent().find('.save-close-container').css('cursor', 'default');

    $('.save-close-container').hide();
    $(this).parent().find('.save-close-container').css('display', 'flex');

    $('.translate-phrase-row').find('.grid-cell-first').css('border-left', '1px solid #ebebeb')
    $(this).parent().parent().parent().parent().find('.grid-cell-first').css('border-left', '4px solid #29b191');

    $('.text-for-translation').unmark();
    var selected_phrase = $(this).parent().parent().parent().parent().find('.text-for-translation');
    // We remove square brackets from phrase.
    getGlossaryMatches(selected_phrase);
});

function getGlossaryMatches(phrase_element) {
  var selected_phrase = phrase_element.text().substring(1, phrase_element.text().length -1).toLowerCase();

  console.log('selected', selected_phrase);
  var html = '';
  glossary_terms.forEach(function(term) {
    if( selected_phrase.indexOf(term.term.toLowerCase()) != -1 ) {
      // here we make it so that if term is_translate false, we show the term as it is.
      html += `<span class="glossary-term">${term.term} = ${term.is_translate == 'Y' ? term.translation : term.term}</span>`;
      phrase_element.mark(term.term, {separateWordSearch: false});
    }
  });
  $('.contains-glossary').html(html);

}

$(document).on('submit', '#translate-form', function(e){
    e.preventDefault();
    var parent = $(this).parent().parent().parent();
    var to_text = parent.find('textarea').val();
    var phrase_id = parent.attr('phrase-id');
    var to_language_code = parent.attr('to-language-code');
    var site_id = parent.attr('site-id');
    var phrase_lang_words = parent.attr('phrase-lang-words');

    $.post('/save-translation', {   // ajax call to update the server with the new translator settings.
        to_text: to_text,
        phrase_id: phrase_id,
        site_id: site_id,
        to_language_code: to_language_code
    }, function() {
        parent.find('.save-close-container').hide();
        parent.find('.grid-cell-first').css('border-left', '1px solid #ebebeb');

        parent.next().find('.save-close-container').css('display', 'flex');
        parent.next().find('.grid-cell-first').css('border-left', '4px solid #29b191');
        parent.next().find('textarea').focus();

        $('.translate-phrase-row').filter(`[phrase-id="${phrase_id}"]`).find('textarea').val(to_text);
        $('.translate-phrase-row').filter(`[phrase-id="${phrase_id}"]`).find('.updated-time').text('just now');

        // WE MUST CHECK IF THE PHRASE HAS ALREADY BEEN TRANSLATED OR NOT BEFORE COUNTING IT..!
        var countDupPhrases = $('.translate-phrase-row').filter(`[phrase-id="${phrase_id}"]`).length;
        myWords += Number(phrase_lang_words) * countDupPhrases;
        totalWordsTranslated += Number(phrase_lang_words) * countDupPhrases;

        statsBar.set_bar_values([{ numVal: myWords }, { numVal: theirWords }], totalWords);
  
        statsBar.set_bar_tooltips([{ 
            title: 'your words',
            tooltipContent: "You translated " + myWords + "/" + totalWords + " words"
            }, {
            title: 'other words', 
            tooltipContent: "Other people translated " + theirWords + "/" + totalWords + " words"
            }, {
            title: 'Translated Words',
            tooltipContent: "" + totalWordsTranslated + "/" + totalWords + " total words translated"
        }])

        // statsBar = new Bar(document.getElementById('translation-stats-container'), {
        //     values: [{ title: 'your words', numVal: myWords, color: '#f6921e', tooltipContent: "You translated " + myWords + "/" + totalWords + " words"},
        //              { title: 'other words', numVal: theirWords, color: '#29b191', tooltipContent: "Other people translated " + theirWords + "/" + totalWords + " words"}
        //             ],
        //     totalValue: {
        //           title: 'Translated Words',
        //           tooltipContentTotal: "" + totalWordsTranslated + "/" + totalWords + " total words translated",
        //           numVal: totalWords,
        //           tooltipMaxWidth: '120px'
        //     }
    });
});

// jQuery(window).bind('beforeunload', function(e) {
//     var message = "Changes you made may not be saved.";
//     e.returnValue = message;
//     return message;
// });