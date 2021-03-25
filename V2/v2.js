// Copyright (C) 2021  TranslateGreat LLC.  All rights reserved.

// var document = {}, window = {}, console={}, sitetran.url_type = false, sitetran.site_id = 0, sitetran.site_default_language_code = 'en', sitetran.widget_type = false; // while running jshint, only

// 1211

"use strict";

if (typeof sitetran == "undefined") {
  // the user can create the sitetran object before calling this file. so he can set defaults.
  // if he doesn't we create it for them.
  var sitetran = {};
  console.warn("The sitetran translation tool was not installed properly");
}

sitetran.site_id = sitetran.site_id || console.warn("Set the sitetran.site_id");
sitetran.dir_mode = sitetran.dir_mode || 'BODY'; // set this to ELEMENT to do it only for text elements.
sitetran.refresh_translation_seconds = sitetran.refresh_translation_seconds || 5;
//sitetran.debug_this_text = "PUT YOUR TEXT HERE"


// sitetran.dev_data; // this is where we put the dev translation data.
sitetran.last_translated = 0; // the last utime this was translated.
sitetran.translation_is_scheduled = 0; // we are scheduled to translate in the future. handy for sites with real time changes.
sitetran.is_translating = 0; // we are in the middle of switching languages. this blocks other stuff from happening.
sitetran.translation_mode = 'prod'; // we are using the sitetran.prod_data. we are not in translator/dev mode.
// sitetran.widget;
// sitetran.lang;
sitetran.tree_modifier_enable = 0;
sitetran.is_requesting = false;
sitetran.wait_for_child_callback = { "dev": { "": false, "widget-": false }, "prod": { "": false, "widget-": false } };
//sitetran.prod_data;
//sitetran.observer;
sitetran.non_whitespace_matcher = /[^ \f\n\r\t\v\u00A0\u2028\u2029]/;  // is there white space in there?
sitetran.whitespace_matcher = /[ \f\n\r\t\v\u00A0\u2028\u2029]+/g;  // all unicode whitespace \s is not universal.
if (!('cookie_change_seconds' in sitetran)) sitetran.cookie_change_seconds = 0; //if the cookie is changed, language on the page gets changed automatically (when the cookie is changed)
sitetran.sitetran_url = sitetran.sitetran_url || '//www.sitetran.com';

// this gets the language_code for this pageview.
// keep sitetran.lang  insync with this.
sitetran.get_page_language_code = function () {
  var language_code = false;
  if (!sitetran.url_type || sitetran.url_type == 'none') {
    language_code = sitetran.cookie_read("sitetran.lang");
    if (language_code) {
      return language_code;
    }
  } else if (sitetran.url_type == 'hash') {
    if (window.location.hash.length > 1) {
      return window.location.hash.substring(1);
    } else {
      language_code = sitetran.cookie_read("sitetran.lang");
      if (language_code) return language_code;
    }
  } else if (sitetran.url_type == 'sub.domain') {
    var sub_domain = sitetran.get_lang_code_sub_domain();
    if (sub_domain && sub_domain != 'www') {
      return sub_domain;
    }
  }
  // We should consider upgrading to NavigatorLanguage.languages something like that, to return other possibly suitable languages
  if (sitetran.use_automatic_language_detection) {
    var client_language = window.navigator.userLanguage || window.navigator.language;
    language_code = client_language.replace(/-.*/, "");
    var lang_list = sitetran.get_lang_list();
    for (var i = 0; i < lang_list.length; i++) {
      if (lang_list[i].language_code == language_code) return language_code;
    }
  }

  return sitetran.site_default_language_code;
};



// the data needs to be in mem.
sitetran.get_lang_list = function () {
  var lang_list = sitetran.translation_mode == 'dev' ? sitetran.dev_data.site_lang_list : sitetran.prod_data.site_lang_list;
  return lang_list.sort(function(a, b){
    return a.language_format_name.localeCompare(b.language_format_name);
  });
};


// these are simplified non-general purpose cookie functions
sitetran.cookie_read = function (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return document.cookie.substring(c_start, c_end);
    }
  }
  return "";
};
sitetran.cookie_write = function (name, value, domain) {
  document.cookie = "" + name + "=" + value + "; path=/; domain=" + domain + "; SameSite=None; Secure";
};


// How to create a new widgets: 
//  1. First try using CSS. The existing widgets are very flexible with CSS. 
//  2. Just update the following list of functions.
//     sitetran.widget_create sitetran.widget_add sitetran.widget_empty sitetran.widget_get_language_code  sitetra._widget_set_language_code

//  this can redirect the page.
sitetran.widget_set_language_code = function (language_code) {
  sitetran.lang = language_code;
  switch (sitetran.widget_type) {
    case 'list':
      sitetran.widget_set_language_code_list(language_code);
      sitetran.widget_populate_languages(sitetran.onchange_event_function());
      break;
    case 'select':
    default:
      return sitetran.widget_set_language_code_select(language_code);
    // there is an even that will fire after this.
  }

};

sitetran.widget_set_language_code_select = function (language_code) {
  if (sitetran.widget) {
    sitetran.widget.value = language_code;
  } else {
    console.warn("sitetran: which widget should i set?");
  }
};

sitetran.widget_set_language_code_list = function (language_code) {
  sitetran.lang = language_code;
};

sitetran.widget_get_language_code = function () {
  switch (sitetran.widget_type) {
    case 'list':
      return sitetran.widget_get_language_code_list();

    case 'select':
    default:
      return sitetran.widget_get_language_code_select();
  }
};

sitetran.widget_get_language_code_list = function () {
  return sitetran.lang;
};

sitetran.widget_get_language_code_select = function () {
  if (sitetran.widget) return sitetran.widget.value;
  return '';
};

sitetran.widget_add = function (text, value, is_selected) {
  switch (sitetran.widget_type) {
    case 'list':
      sitetran.widget_add_list(text, value, is_selected);
      break;
    case 'select':
    default:
      sitetran.widget_add_select(text, value, is_selected);
  }
};

sitetran.widget_add_list = function (text, value, is_selected) {
  var li = document.createElement('li');
  if (is_selected) {
    li.innerHTML = text;
  } else {
    var a = document.createElement('a');

    var new_url = sitetran.get_sub_url(value);
    if (new_url) {
      a.setAttribute("href", new_url);
    } else {
      console.warn("sitetran: this shouldn't happen.");
    }
    a.innerHTML = text;
    li.appendChild(a);
  }

  sitetran.widget.appendChild(li);
};


sitetran.widget_add_select = function (text, value, is_selected) {
  var option = document.createElement('option');

  option.text = text;
  option.value = value;
  if (is_selected) option.selected = true;

  sitetran.widget.appendChild(option);
};

sitetran.widget_empty = function (text, value, is_selected) {
  switch (sitetran.widget_type) {
    case 'list':
      sitetran.widget_empty_list();
      break;
    case 'select':
    default:
      sitetran.widget_empty_select();
  }
};

sitetran.widget_empty_list = function () {
  sitetran.widget_empty_select(); // same...
};

sitetran.widget_empty_select = function () {
  if (!sitetran.widget) return; // just in case someone tries double creating
  var firstChild = sitetran.widget.firstChild;
  while (firstChild) {
    sitetran.widget.removeChild(firstChild);
    firstChild = sitetran.widget.firstChild;
  }
};

sitetran.widget_create = function () {
  if (sitetran.widget) return; // just in case someone tries double creating
  switch (sitetran.widget_type) {
    case 'list':
      sitetran.widget_create_list();
      break;
    case 'select':
    default:
      sitetran.widget_create_select();
      break;
  }
};

// sitetran.widget_create_list = function () { //{{{
//   var sitetran_list = document.getElementById('sitetran_list');
//   console.log('239', sitetran_list)
//   if (!sitetran_list) {
    
//     // widgetc here is where we create it.
//     var list = document.createElement('ul');
//     list.id = "sitetran_list";

//     var sitetran_translate_element = document.getElementById('sitetran_translate_element');
//     sitetran.widget = sitetran_translate_element.appendChild(list);
//     // end widgetc
//     console.log('were in 247 create list ')
//     sitetran.widget_set_translator_toggle();
//   }

//   // sitetran.widget.onchange is not required for links. 
// }; //}}}


sitetran.toggle = function () {
  if (sitetran.translation_mode == 'dev') {
    sitetran.translation_mode = 'prod';
    document.getElementsByTagName('body')[0].removeAttribute('ondblclick');
    sitetran.widget_set_language_code(sitetran.site_default_language_code);
  } else {
    sitetran.translation_mode = 'dev';
  }
  // sitetran.data_update() TODO
  sitetran.widget_populate_languages(sitetran.onchange_event_function);
};


sitetran.widget_set_translator_toggle = function () {
  var sitetran_toggle = document.getElementById("sitetran_toggle");
  if (sitetran_toggle) {
    sitetran_toggle.addEventListener('dblclick', sitetran.toggle);
  }
};

sitetran.widget_create_select = function () { //{{{
  /**********  Creation of pull down menu  ************/
  var sitetran_select = document.getElementById('sitetran_select');
  if (!sitetran_select) {
    // widgetc here is where we create it.
    var select = document.createElement('select');
    select.id = "sitetran_select";
    var sitetran_translate_element = document.getElementById('sitetran_translate_element');
    sitetran.widget = sitetran_translate_element.appendChild(select);
    // end widgetc

    sitetran.widget_set_translator_toggle();
  }

  //on change of languages from select box
  sitetran.widget.onchange = function () {
    sitetran.onchange_event_function();
  };
}; //}}}

sitetran.get_sub_url = function (new_language_code) {
  var current_language_code = sitetran.get_lang_code_sub_domain();
  var the_location = window.location.toString();
  if (new_language_code.length > 10) {
    return '';
    // this isn't a language_code. at the moment unfortunately we put other codes in here and they are long.
  } else if (current_language_code == new_language_code) {
    return '';
  } else if (!current_language_code) {
    // prepend the lang code to the domain.
    return the_location.replace(/\/\//, "//" + new_language_code + ".");
  } else if (current_language_code == 'www') {
    // it's standard to switch www with the lang code.
    return the_location.replace(/\/\/www/i, "//" + new_language_code);
  } else {
    // switch one lang code with another.
    return the_location.replace(/\/\/[^\.]*/, "//" + new_language_code);
  }
};

sitetran.onchange_event_function = function () {
  //first we preserve settings for when the page reloads


  sitetran.lang = sitetran.widget_get_language_code(); //why would we use a method to set a class variable.


  var old_mode = sitetran.cookie_read("sitetran_translation_mode");

  if (
    old_mode != sitetran.translation_mode && (old_mode || sitetran.translation_mode == "dev")
  ) {                                 // the default is prod, so a prod cookie is not required except to overwrite a dev cookie.
    sitetran.cookie_write("sitetran_translation_mode", sitetran.translation_mode, "." + sitetran.get_parent_domain(window.location.hostname));
  }


  if (sitetran.lang) {
    if (!sitetran.url_type || sitetran.url_type == 'none') {
      sitetran.cookie_write("sitetran.lang", sitetran.lang, "." + sitetran.get_parent_domain(window.location.hostname));
    } else if (sitetran.url_type == 'hash') {
      sitetran.cookie_write("sitetran.lang", sitetran.lang, "." + sitetran.get_parent_domain(window.location.hostname));
      window.location.hash = sitetran.lang;
    } else if (sitetran.url_type == 'sub.domain') {
      sitetran.change_url_sub();
    }
  }


  //then we update the page 

  if (sitetran.is_translating) return;
  sitetran.onchange_action(true);
};

sitetran.change_url_sub = function () {
  var current_language_code = sitetran.get_lang_code_sub_domain();
  // we probably shouldn't redirect on a POST method. but, no way to detect the HTTP method.
  //
  // when the user changes lang on a url where redirect is not good, the site needs to pass a different sitetran.url_type 
  //
  // if you don't want "en." and "www." then YOU should redirect users away from the www to the default language.
  if (sitetran.lang.length > 10) {
    // this isn't a language_code. at the moment unfortunately we put other codes in here and they are long.
  } else if (current_language_code == sitetran.lang) {
    // this happens if we are changing modes.
  } else {
    window.location.replace(sitetran.get_sub_url(sitetran.lang));
  }
};

// try and figure out the language_code sub_domain. 
// does a better job if it has a list.
sitetran.get_lang_code_sub_domain = function () {
  var parent_domain = sitetran.get_parent_domain(window.location.hostname);
  if (parent_domain.length == window.location.hostname.length) return parent_domain;
  return window.location.hostname.substring(0, window.location.hostname.length - parent_domain.length - 1);
};

// parent only. we don't get too crazy and get the root domain. 
// if your domain is obscure enough to trick this func tell us and we'll fix it for u.
sitetran.get_parent_domain = function (domain) {
  var domain_frags = domain.split('.');

  if (domain_frags.length <= 2) return domain;

  if (domain_frags.length == 3) {
    if (
      domain_frags[domain_frags.length - 1].length == '2'
      && domain_frags[domain_frags.length - 2].length == '2'
    ) {
      // this is a root domain for a country like example.co.uk
      return domain;
    }
  }

  domain_frags.splice(0, 1);

  return domain_frags.join(".");
};

sitetran.update_init = function () {    
  // we basically set up the widet and add the languages and the listener and change the language if neccessary.

  sitetran.widget_create();
  sitetran.lang = sitetran.get_page_language_code();
  sitetran.widget_populate_languages();
  if (sitetran.lang != sitetran.site_default_language_code) sitetran.onchange_action(true); // no need to translate to the default lang on page load.
  sitetran.tree_modifier_enable = 1;
  sitetran.tree_modified_listener_add();

  sitetran.poll_cookie_change_timer();
};

sitetran.data_update = function (callback) {
  // perhaps this should be outside of the pulldown..

  if (!sitetran.do_we_have_the_json_data("", sitetran.translation_mode)) {
    return sitetran.get_json_content(sitetran.translation_mode, "", callback);
  } else {
    callback();
  }
};

sitetran.language_list_update = function (callback) {
  // perhaps this should be outside of the pulldown..
  if (!sitetran.do_we_have_the_json_data("widget-", sitetran.translation_mode)) {
    return sitetran.get_json_content(sitetran.translation_mode, "widget-", callback);
  } else {
    callback();
  }
};


sitetran.tree_modified_listener_add = function () {
    //console.log('mutation listener added');
  if (typeof MutationObserver !== 'function') {
    // for an older browser.
    // This triggers the translations when DOM changes
    document.addEventListener("DOMSubtreeModified", sitetran.tree_modified_listener);
    return;
  }

  var config = { attributes: true, childList: true, subtree: true };

  if (!sitetran.observer) sitetran.observer = new MutationObserver(sitetran.tree_modified_listener);

  sitetran.observer.observe(document.body, config);
};

sitetran.tree_modified_listener_remove = function () {
  if (typeof MutationObserver !== 'function') {
    // for an older browser.
    // stops when we are making the changes and we don't want to listen to our own changes.
    document.removeEventListener("DOMSubtreeModified", sitetran.tree_modified_listener);
    return;
  }

  if (!sitetran.observer) return; // it is not even set up to observe yet, so no need to disconnect.

  sitetran.observer.disconnect();
};


sitetran.tree_modified_listener = function () {//{{{
    console.log('i hereeeeee');
    
  if (!sitetran.tree_modifier_enable) {
      console.log('true or false:', sitetran.tree_modifier_enable);
    return;
  }

  if (sitetran.last_translated > new Date().getTime() / 1000 - sitetran.refresh_translation_seconds) {
      //console.log(sitetran.refresh_translation_seconds);
    //console.log('time to translate');
    // we just translated 5 seconds ago. so let's slow it down.
    // let's schedule it for the future, if it's not already scheduled.
    if (!sitetran.translation_is_scheduled) {
      sitetran.translation_is_scheduled = 1;
      window.setTimeout(sitetran.new_page, sitetran.refresh_translation_seconds * 1000 - 100); // -100 msecs to avoid race condition
    }
    return;
  }
  sitetran.new_page();
  sitetran.last_translated = new Date().getTime() / 1000;
  sitetran.translation_is_scheduled = 0;
};//}}}





sitetran.change_language = function (selected_language_code) {
  //console.log('do we have data to change????');  
  //console.log(Date.now());
  var sitetran_data;

  if (sitetran.translation_mode == 'prod') {
    //console.log('hi');
    if (!sitetran.do_we_have_the_json_data("", sitetran.translation_mode)) return sitetran.data_update(function () { sitetran.change_language(selected_language_code); });
    sitetran_data = sitetran.prod_data;
    //    console.log('prod_data', sitetran.prod_data)
  } else {
    if (!sitetran.do_we_have_the_json_data("", sitetran.translation_mode)) return sitetran.data_update(function () { sitetran.change_language(selected_language_code); });
    sitetran_data = sitetran.dev_data;
  }

  if (!sitetran_data.language_code[selected_language_code]) {
    // the selected_language_code is invalid (could be a misconfiguration of your widget) OR the sitetran_data did not download properly. (network)
    // so, let's not translate for this request, and wait for it to get downloaded properly.
    console.warn("Sitetran warning: Could not translate: ", selected_language_code, ". Please reload. Contact us at support@sitetran.com and tell what happened.");
    return;
  }

  sitetran.tree_modified_listener_remove();
  sitetran.is_translating = 1;

  if (sitetran.dir_mode == 'BODY') {
    document.body.dir = sitetran_data.language_code[selected_language_code].direction_code;
  }
  //console.log('changing!!! dont come in!');
  sitetran.change_language_helper(document.documentElement, sitetran_data, selected_language_code);
  sitetran.is_translating = 0;
  sitetran.tree_modified_listener_add();
};

// This traverses through the DOM to find and change the text. currently just the TEXT_NODE  
sitetran.change_language_helper = function (node, sitetran_data, selected_language_code) { //{{{
  if (node.id && node.id == 'sitetran_translate_element') return; // the widget doesn't need to be translated.

  // If node is a text node. this assumes text nodes do not have children.
  if (node.nodeType == 3 && typeof node.nodeValue != 'undefined') {
    sitetran.phrase_changer(node, sitetran_data, selected_language_code);
  } else if (node.nodeType == 1 && node.nodeName == "INPUT") {
    sitetran.phrase_changer(node, sitetran_data, selected_language_code);
  } else if (node.nodeName == 'IMG') {
    sitetran.phrase_changer(node, sitetran_data, selected_language_code);
  } else {
    if (node.nodeType == 1 && node.nodeName == 'OPTGROUP') {
      sitetran.phrase_changer(node, sitetran_data, selected_language_code);
    }

    for (var i = 0; i < node.childNodes.length; i++) {
      sitetran.change_language_helper(node.childNodes[i], sitetran_data, selected_language_code);
    }
  }
};//}}}


// in the negative because there may be no selector.
sitetran.does_not_match_selector = function (sitetran_data, element, phrase_id) {
  var ps_selector = false;
  if (typeof sitetran_data.phrase_selector_lookup[phrase_id] != "undefined") {
    ps_selector = sitetran_data.phrase_selector_lookup[phrase_id][0].ps_selector;
  }

  var isElementPresent = false;
  if (ps_selector) {
    //sees if the element matches the selector.
    var ps_selectors_array = document.querySelectorAll(ps_selector);
    for (var i = 0; i < ps_selectors_array.length; i++) {
      if (ps_selectors_array[i] == element) {
        isElementPresent = true;
      }
    }
  }
  var does_not_match_selector = ps_selector && !isElementPresent;
  return does_not_match_selector;
};



// this function changes the language of a node and it also adds the phrase_id's to the attribute
sitetran.phrase_changer = function (node, sitetran_data, selected_language_code) {//{{{
  var text_node = node.nodeType == 3;
  var nodeText, element;
  var node_attribute = false;
  if (text_node) {
    nodeText = node.nodeValue;
    element = node.parentElement;
  } else if (node.nodeName == 'OPTGROUP') {
    if (node.hasAttribute("label")) {
      node_attribute = 'label';
      nodeText = node.getAttribute("label");
    } else {
      return;
    }
    element = node;
  } else if (node.nodeName == 'INPUT') {
    // we'll translate these as well.
    if (node.getAttribute("type") == "button" || node.getAttribute("type") == "submit") {
      // these can go back to the server so we should add an optional to check if there are name attributes.
      node_attribute = 'value';
      nodeText = node.getAttribute("value");
    } else if (node.hasAttribute("placeholder")) {
      nodeText = node.getAttribute("placeholder");
      node_attribute = 'placeholder';
    } else {
      return;
    }
    element = node;
  } else if (node.nodeName == 'IMG') {
    if (node.hasAttribute("alt") || node.hasAttribute("title")) {
      //this is not working because nodeText variable gets overwritten for title after alt is found.
      if (node.hasAttribute("title")) {
        nodeText = node.getAttribute("title");
        node_attribute = 'title';
      } if (node.hasAttribute("alt")) {
        nodeText = node.getAttribute("alt");
        node_attribute = 'alt';
      }
    } else {
      return;
    }
    element = node;
  } else {
    return;
  }
  if (nodeText === null) return;
  if ("debug_this_text" in sitetran && sitetran.debug_this_text === nodeText) debugger;
  var node_index;
  var new_element = typeof element.sitetran_phrase_ids == 'undefined';
  var new_text_node;
  var sitetran_phrase_ids_str;
  var sitetran_phrase_ids;
  var nodeContent = nodeText.replace(sitetran.whitespace_matcher, " "); // all unicode whitespace \s is not universal.

  if (new_element) {
    // if it's a new element, then the text nodes must be new too.
    new_text_node = true;
  } else {
    // an old element can still have a new text node because we are updating certain nodes not all elements.
    // an element like a div can have many text nodes in it.
    //
    // TODO --- review if we can edit all the text nodes for a single element more seemlessly.

    sitetran_phrase_ids_str = element.sitetran_phrase_ids;
    sitetran_phrase_ids = sitetran_phrase_ids_str.split(",");
    node_index = sitetran.find_node_index(node);
    if (node_index < sitetran_phrase_ids.length) {
      // this is a new text node on an already updated element.
      new_text_node = false;
    } else {
      new_text_node = true;
    }

  }

  var node_changed = 0;
  if (new_text_node) {
    // we need to update the sitetran_phrase_ids's. this is the first language changing for this user on this page.

    var phrase_id = 0;

    if (
      typeof sitetran_data.phrase_id_lookup[nodeContent] != 'undefined'
      &&
      typeof sitetran_data.phrase_id_lookup[nodeContent][sitetran.site_default_language_code] != 'undefined'
    ) {
      // let's find the best index/phrase_id and use that.
      var selected_phrase_id = 0; // 0 signifies no match.
      var matching_phrase_id = 0;
      for (var index = 0; index < sitetran_data.phrase_id_lookup[nodeContent][sitetran.site_default_language_code].length; index++) {
        phrase_id = sitetran_data.phrase_id_lookup[nodeContent][sitetran.site_default_language_code][index];
        if (sitetran.does_not_match_selector(sitetran_data, element, phrase_id)) continue;
        selected_phrase_id = phrase_id;
        if (
          typeof sitetran_data.phrase_lang_lookup[selected_language_code] == 'undefined'
          ||
          typeof sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id] == 'undefined'
        ) continue;
        matching_phrase_id = phrase_id;
      }
      phrase_id = 0;
      if (selected_phrase_id) phrase_id = selected_phrase_id;
      if (matching_phrase_id) phrase_id = matching_phrase_id;
    }


    if (phrase_id) {  // the system has a phrase_id for this phrase in this language.
      if (sitetran_phrase_ids_str) {
        // we have some phrase_id's so add a comma after it to prepare for the next. 
        // this filters out the undefined.
        sitetran_phrase_ids_str = "" + sitetran_phrase_ids_str + "," + phrase_id;
      } else {
        sitetran_phrase_ids_str = "" + phrase_id;
      }

      element.sitetran_phrase_ids = sitetran_phrase_ids_str;

      if (
        typeof sitetran_data.phrase_lang_lookup[selected_language_code] != 'undefined'
        &&
        typeof sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id] != 'undefined'
      ) {
        // this phrase has a translation.
        if (sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text && sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text.trim().length > 0) {
          // interestingly we see here that empty phrases have lower precedents.
          if (text_node) {
            node.nodeValue = sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text;
          } else {
            node.setAttribute(node_attribute, sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text);
          }
          node_changed = 1;
        } else {
          if (sitetran.translation_mode == "dev") { // don't show [deleted] except to the translators.
            if (text_node) {
              node.nodeValue = "[deleted]";
            } else {
              node.setAttribute(node_attribute, "[deleted]");
            }
            node_changed = 1;
          } else {
            if (text_node) {
              node.nodeValue = sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text;
            } else {
              node.setAttribute(node_attribute, sitetran_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text);
            }
            node_changed = 1;
          }
        }
      } else if (typeof sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code][phrase_id] != 'undefined') {
        // this phrase is not translated.
        // aaa, this else if must always be true remove the else if condition and test.
        if (text_node) {
          node.nodeValue = sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code][phrase_id].phrase_lang_text;
        } else {
          node.setAttribute(node_attribute, sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code][phrase_id].phrase_lang_text);
        }
        if (sitetran.dir_mode == 'ELEMENT') {
          element.dir = sitetran_data.language_code[sitetran.site_default_language_code].direction_code;
        }
      }
    } else {
      // we have never seen this phrase before so we'll add a 0 phrase_id
      // this way the sitetran_phrase_ids match the order of the nodes.

      sitetran_phrase_ids_str = element.sitetran_phrase_ids;
      if (sitetran_phrase_ids_str) {
        sitetran_phrase_ids_str = "" + sitetran_phrase_ids_str + ",0";
      } else {
        sitetran_phrase_ids_str = "0";
      }
      element.sitetran_phrase_ids = sitetran_phrase_ids_str;

    }
  } else { //  this element already exists. no need to update the attr//{{{
    // there is a phrase_id for this content.

    // we already got this text node yet so we use that phrase_id.
    // aaa, yeah but what if the user changed around an element???? 
    //todo. let's handle that case too. we can just compare it with what it should be. to see if it was changed.


    var content_phrase_id = sitetran_phrase_ids[node_index];

    if (typeof sitetran_data.phrase_lang_lookup[selected_language_code] != 'undefined'
      &&
      typeof sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id] != 'undefined'
    ) {
      // there is a translation for the selected language
      if (sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id].phrase_lang_text && sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id].phrase_lang_text.trim().length > 0) {
        if (text_node) {
          node.nodeValue = sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id].phrase_lang_text;
        } else {
          node.setAttribute(node_attribute, sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id].phrase_lang_text);
        }
        node_changed = 1;
      } else {
        if (sitetran.translation_mode == "dev") { // don't show [deleted] except to the translators.
          if (text_node) {
            node.nodeValue = "[deleted]";
          } else {
            node.setAttribute(node_attribute, "[deleted]");
          }
          node_changed = 1;
        } else {
          if (text_node) {
            node.nodeValue = sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id].phrase_lang_text;
          } else {
            node.setAttribute(node_attribute, sitetran_data.phrase_lang_lookup[selected_language_code][content_phrase_id].phrase_lang_text);
          }
          node_changed = 1;
        }
      }


    } else {
      if (content_phrase_id && content_phrase_id != "0" && sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code] && sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code][content_phrase_id]) {
        if (text_node) {
          node.nodeValue = sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code][content_phrase_id].phrase_lang_text;
        } else {
          node.setAttribute(node_attribute, sitetran_data.phrase_lang_lookup[sitetran.site_default_language_code][content_phrase_id].phrase_lang_text);
        }

        if (sitetran.dir_mode == 'ELEMENT') {
          element.dir = sitetran_data.language_code[sitetran.site_default_language_code].direction_code;
        }
      }
    }

  }//}}}

  if (node_changed) {
    if (sitetran.dir_mode == 'ELEMENT') {
      element.dir = sitetran_data.language_code[selected_language_code].direction_code;
    }
  }
}



//This changes the language of a web page based upon the language selected in the widget.
sitetran.onchange_action = function (language_changed) { //{{{

  var selected_language_code = sitetran.lang; // why are we renaming a var for no reason? todo fix it.
  //console.log("@@@@@", selected_language_code)
  if (sitetran.translation_mode === 'dev') {//{{{
    var bodyElem = document.getElementsByTagName('body')[0];

    sitetran.tree_modified_listener_remove();
    sitetran.add_dblclick(bodyElem, selected_language_code);
    sitetran.fixdblclick(bodyElem);
    sitetran.tree_modified_listener_add();
    //You should not be able to open translation dialogue for the site_default_language when in translation mode. Try consoling selected_language_code, sitetran.site_default_language_code
    if (selected_language_code === sitetran.site_default_language_code) {
      // todo: is this the best way to remove all of the ondbclick attributes?
      document.getElementsByTagName('body')[0].removeAttribute('ondblclick');
    }
    //}}}
  } else if (sitetran.translation_mode == 'prod') {//{{{
    if (selected_language_code === sitetran.site_default_language_code) {
      sitetran.tree_modified_listener_remove();
      // we only need to do this if we were just in dev.
      document.getElementsByTagName('body')[0].removeAttribute('ondblclick');
      sitetran.tree_modified_listener_add();
    }
  }    //}}}
  sitetran.change_language(selected_language_code);
  if(language_changed){
    let s_request = 'https://www.sitetran.com/stats/?language_code=' + sitetran.lang + '&site_id=' + sitetran.site_id;
    sitetran.send_request_to(s_request);
  }


};//}}}

sitetran.send_request_to = function (url) {
  var client = new  XMLHttpRequest();
  client.open('GET', url, true);
  client.send();
};

sitetran.update_json_data_from_parent = function (file_prefix, translation_mode) {
  // if we already have the "" data don't grab "widget-" data from the parent.
  if (sitetran.do_we_have_the_json_data("", translation_mode)) return;

  if (translation_mode != 'dev') {
    if (file_prefix == 'widget-' && parent.sitetran.prod_data) {
      sitetran.prod_data = parent.sitetran.prod_data;
      return true;
    } else if (parent.sitetran.prod_data && parent.sitetran.prod_data.phrase_id_lookup) {
      sitetran.prod_data = parent.sitetran.prod_data;
      return true;
    }
  } else {
    if (file_prefix == 'widget-' && parent.sitetran.dev_data) {
      sitetran.dev_data = parent.sitetran.dev_data;
      return true;
    } else if (parent.sitetran.dev_data && parent.sitetran.dev_data.phrase_id_lookup) {
      sitetran.dev_data = parent.sitetran.dev_data;
      return true;
    }
  }

  return false;
};

sitetran.do_we_have_the_json_data = function (file_prefix, translation_mode) {
  if (translation_mode != 'dev') {
    if (file_prefix == 'widget-' && sitetran.prod_data) {
      return true;
    } else if (sitetran.prod_data && sitetran.prod_data.phrase_id_lookup) {
      return true;
    }
  } else {
    if (file_prefix == 'widget-' && sitetran.dev_data) {
      return true;
    } else if (sitetran.dev_data && sitetran.dev_data.phrase_id_lookup) {
      return true;
    }
  }

  return false;
};

// This calls s3 bucket sitetran data structure lookups
sitetran.get_json_content = function (translation_mode, file_prefix, callback) {//{{{
  var filename;
  var _target = '';

  // the parent waits for its child by just setting the callback var to an actual cb func
  if (window.sitetran.wait_for_child_callback[translation_mode][file_prefix]) {
    // console.log("the child is running. so the parent is has the child call it back when its ready.");
    window.sitetran.wait_for_child_callback[translation_mode][file_prefix] = function () {
      sitetran.get_json_content(translation_mode, file_prefix, callback);
    };
    return;
  }


  // here we see if the parent has prod data and take it if it has.
  if (
    window.parent != window
    &&
    window.parent.sitetran.site_id == sitetran.site_id

  ) { // window.top? recursive is overkill.
    // console.log("the child is trying to skip the network call.");
    if (sitetran.update_json_data_from_parent(file_prefix, translation_mode)) return callback();
  }


  // here we wait and restart if the parent is busy requesting.
  if (window.parent != window
    &&
    window.parent.sitetran.site_id == sitetran.site_id
  ) {

    if (window.parent.sitetran.is_requesting || window.parent.sitetran.wait_for_child_callback[translation_mode][file_prefix]) {
      // let's wait for the parent to finish.
      setTimeout(function () {
        sitetran.get_json_content(translation_mode, file_prefix, callback);
      }, 500);
      return;
    } else {
      // tell the parent to wait, if it's not requesting yet.
      // if it already ran no problem.
      window.parent.sitetran.wait_for_child_callback[translation_mode][file_prefix] = true;
    }
  }


  if (sitetran.do_we_have_the_json_data(file_prefix, translation_mode)) return callback();



  sitetran.is_requesting = true;

  var protocol = document.location.protocol;
  if (protocol == 'file:') protocol = 'http:';

  if (translation_mode !== "prod") {
    filename = file_prefix + "dev-json.js";
    _target = protocol + "//s3.amazonaws.com/cdn.sitetran.com/" + sitetran.site_id + "/" + filename;
  } else {
    filename = file_prefix + "prod-json.js";
    _target = protocol + "//c.sitetran.com/" + sitetran.site_id + "/" + filename;
  }

  sitetran.server_request(_target, function (trd) {
    if (translation_mode !== "prod") {
      sitetran.dev_data = trd;
      if (file_prefix == "" || !window.parent.sitetran.dev_data) window.parent.sitetran.dev_data = trd;
    } else {
      sitetran.prod_data = trd;
      if (file_prefix == "" || !window.parent.sitetran.prod_data) window.parent.sitetran.prod_data = trd;
    }
    sitetran.is_requesting = false;


    // handle the parent cb or boolean.
    if (window.parent.sitetran.wait_for_child_callback[translation_mode][file_prefix]) {
      var cb = window.parent.sitetran.wait_for_child_callback[translation_mode][file_prefix];
      window.parent.sitetran.wait_for_child_callback[translation_mode][file_prefix] = false;
      if (typeof cb == 'function') {
        cb.call(parent);
      }
    }

    // now we are done and cb
    callback();
  });
};//}}}


// WARNING it seems like we can only do one request at a time with this this AJAX function. only the last callback works.
sitetran.server_request = function (target, callback) {  //{{{
  // let's replace this with AJAX by setting up CORS on the CDN's etc.
  var $jsonp = (function () {
    var that = {};

    that.send = function (src, options) {
      var callback_name = options.callbackName || 'callback';
      var on_success = options.onSuccess || function () { };
      var on_timeout = options.onTimeout || function () { };
      var timeout = options.timeout || 100; // sec

      var timeout_trigger = window.setTimeout(function () {
        window[callback_name] = function () { };
        on_timeout();
      }, timeout * 1000);

      window[callback_name] = function (data) {
        window.clearTimeout(timeout_trigger);
        on_success(data);
      };

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;

      sitetran.tree_modified_listener_remove();  // we are modifying the tree but we don't want to call the event.
      document.getElementsByTagName('head')[0].appendChild(script);
      sitetran.tree_modified_listener_add();
    };

    return that;
  })();

  $jsonp.send(target + '?callback=sitetranCallbackFunc', {
    callbackName: 'sitetranCallbackFunc',
    onSuccess: function (_sitetrandata) {
      callback(_sitetrandata);
    },
    onTimeout: function () {
      console.warn("sitetran: We could not load the translation data. Please check the network.");
    },
    timeout: 200
  });
};//}}}

/******* This function triggers on change event on the translation select box *******/
/****** Use this function if translations needs to be redone because of changes to the DOM from a user clicking on a web-app *******/
sitetran.new_page = function () {//{{{
  // console.log("sitetran.new_page()");

  sitetran.lang = sitetran.widget_get_language_code();

  if (sitetran.lang != sitetran.site_default_language_code) sitetran.onchange_action(false); // no need to translate to the default lang on page load.
}//}}}

sitetran.cleanDomElementSitetranPhraseIds = function (node){
  if (node.id && node.id == 'sitetran_translate_element') return; // the widget doesn't need to be translated.
  
  delete node.sitetran_phrase_ids;

  // If node is a text node. this assumes text nodes do not have children.
  if (node.nodeType == 3 && typeof node.nodeValue != 'undefined') {
  } else if (node.nodeType == 1 && node.nodeName == "INPUT") {
  } else if (node.nodeName == 'IMG') {
  } else {

    for (var i = 0; i < node.childNodes.length; i++) {
      sitetran.cleanDomElementSitetranPhraseIds(node.childNodes[i]);
    }
  }

}

sitetran.translatephrase_dialog = function ({
  phrase_ids,
  src_lang_ids,
  target_lang_ids,
  source_text,
  translation_text,
  selected_language_code,
  dest_language_name,
  src_lang_code,
  src_language_name,
  ps_selectors,
  ps_selecotr_ids,
  example_url,
  example_instructions,
  ps_urls,
}) {//{{{

  var queryStringBuilder = function (phrase_data_array, keyName, url) {
    for (var n = 0; n < phrase_data_array.length; n++) {
      url += "&" + keyName + "_" + (n + 1) + "=" + encodeURIComponent(phrase_data_array[n]);
    }

    return url;
  };

  var url_query_str = '/get-phrases-from-widget?';
  url_query_str += queryStringBuilder(phrase_ids, 'phrase_id', '');

  // we must remove these.
  url_query_str = queryStringBuilder(src_lang_ids, 'phrase_src_lang_id', url_query_str);
  url_query_str = queryStringBuilder(target_lang_ids, 'phrase_target_lang_id', url_query_str);

  url_query_str = queryStringBuilder(source_text, 'origin_text', url_query_str);
  url_query_str = queryStringBuilder(translation_text, 'translation_text', url_query_str);
  url_query_str = queryStringBuilder(ps_urls, 'target_url', url_query_str);
  url_query_str = queryStringBuilder(ps_selectors, 'jquery_selector', url_query_str);
  url_query_str += '&to_language_code=' + selected_language_code;
  
  url_query_str = queryStringBuilder(ps_selecotr_ids, 'ps_selecotr_id', url_query_str);

  sitetran.tree_modified_listener_remove();

  var protocol = document.location.protocol;
  if (protocol == 'file:') protocol = 'http:';

  var sitetran_url = protocol + sitetran.sitetran_url;

  if ( ! sitetran.addEventListener_for_sitetran )
  window.addEventListener('message', function(e) {
    // Get the sent data
    if (  e.data !== 'reset sitetran data' ) return;
    

    // if (sitetran.is_translating) return; // this potentially prevents erase condition.

    // This is causing a cross-origin frame issue
    // I think this relates to sites with lots of iframes where we only use the root parent window
    //if (window.parent && window.parent.sitetran) _sitetran = window.parent.sitetran
    // if (window.frames && window.frames.sitetran) _sitetran = window.frames.sitetran

    setTimeout(function(){
      
      sitetran.dev_data = false;
      //_sitetran.prod_data = false; // SPECIAL: We don't recover this. Maybe we don't need to wipe it out.
      // now that we're not doing a settimeout, maybe we're moving too fast for S3 somehow, because the lang doesn't get updated.
      // are we using an old version of the data, so is it in the cache or did S3 not update it yet?

      sitetran.data_update(
        function() {
          sitetran.onchange_action(true);
          sitetran.prod_data = sitetran.dev_data

          const currentSelectedLang = sitetran.get_page_language_code();
          sitetran.change_language(sitetran.site_default_language_code);
          sitetran.cleanDomElementSitetranPhraseIds(document.documentElement);
          sitetran.change_language(currentSelectedLang);
        }
      );
      
      sitetran.close_tran_window();
    });
  });
  sitetran.addEventListener_for_sitetran = true;

  //url needs to be changed. let's rename it to get-phrase-from-widget
  var src_url = sitetran_url + url_query_str + "&dest_lang_name=" + dest_language_name + "&src_lang_code=" + src_lang_code + "&src_lang_name=" + src_language_name + "&site_id=" + sitetran.site_id + "&example_url=" + encodeURIComponent(example_url) + "&example_instructions=" + encodeURIComponent(example_instructions) + "&total_phrases=" + phrase_ids.length;

  var dialog = sitetran.create_dialog();
  dialog.innerHTML = '<div class="st_transDialog"><div id="st_dialogContainer" align="center" style="" ><div class="st_transHeader" style=""><span id="st_closeDialog" style="display:block; width:20px; height:20px;"><img src="https://c.sitetran.com/widget/icons/close-icon.svg" style="width:100%;"></span></div><div class="st_iframeContainer" style=""><iframe id="sitetranFrame" src="' + src_url + '" frameborder="0" style=""></iframe></div></div></div>';
  //document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  sitetran.bind_close_dialog_event();

  sitetran.tree_modified_listener_add();
};//}}}

var sitetran_loaded_css = false;
sitetran.create_dialog = function () {//{{{

  var dialog = document.createElement('div');
  dialog.className = 'st_transDialogModel';

  document.body.appendChild(dialog);

  if (!sitetran_loaded_css) {
    sitetran_loaded_css = true;
    var s = document.createElement("style");
    var css_str =
      ".st_transDialogModel{" +
      "  position: fixed;" +
      "  top: 0;" +
      "  right: 0;" +
      "  bottom: 0;" +
      "  left: 0;" +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "  z-index: 2147483646;" +
      "  overflow: auto;" +
      "  overflow-y: scroll;" +
      "  -webkit-overflow-scrolling: touch;" +
      "  outline: 0;" +
      "}" +
      " .st_iframeContainer { " +
      "   background: #FFFFFF !important; " +
      "   float:left; " +
      "     margin: 1px; " +
      "  padding: 0 !important;" +
      "     width:683px; " +
      "     height:488px; " +
      " } " +
      "  " +
      " #sitetranFrame{ " +
      "   margin:2 !important;  " +
      "   width:681px; " +
      "   height:486px; " +
      " } " +
      "  " +
      " #st_closeDialog{ " +
      "   float: right; " +
      "   margin-right: 5px !important; " +
      "   margin-top: 0px !important; " +
      "   margin-bottom: 0px !important; " +
      "   cursor: pointer; " +
      "   padding: 5px !important; " +
      "   color:#F5DEB3 !important; " +
      " } " +
      "  " +
      " .st_transHeader{ " +
      "   float:left; " +
      "   padding: 0px !important; " +
      "   width:100%; " +
      "   height:30px; " +
      "   border-bottom: solid 1px #F5DEB3; " +
      "     background : #312C2C !important; " +
      " } " +
      "  " +
      " #st_dialogContainer{ " +
      "   width:100%; " +
      "  margin: 0 !important;" +
      "  padding: 0 !important;" +
      "   height:100% ; " +
      " } " +
      "  " +
      " .st_transDialog{ " +
      "   width: 685px; " +
      "   height: 550px; " +
      "  z-index: 2147483647;" +
      "     margin: 0 auto; " +
      "     padding: 0 !important; " +
      "     position: relative; " +
      "     background : #312C2C !important; " +
      "     border-radius: 6px ; " +
      "     top: 20px ; " +
      " } "
      ;

    s.innerHTML = css_str;

    sitetran.tree_modified_listener_remove();
    document.getElementsByTagName("head")[0].appendChild(s);
    sitetran.tree_modified_listener_add();
  }

  var dialogContent = '';
  return dialog;
};//}}}


sitetran.close_tran_window = function () {
  sitetran.tree_modified_listener_remove();
  document.getElementsByTagName('body')[0].style.overflow = 'auto';
  var dialog = document.getElementsByClassName('st_transDialogModel')[0];
  dialog.parentNode.removeChild(dialog);
  sitetran.bind_close_dialog_event_ran = false;
  removeEventListener("message", sitetran.close_tran_window, false);
  sitetran.tree_modified_listener_add();
};

sitetran.bind_close_dialog_event = function () {//{{{
  if ( sitetran.bind_close_dialog_event_ran ) return;
  sitetran.bind_close_dialog_event_ran = true;
  document.getElementById('st_closeDialog').addEventListener('click', sitetran.close_tran_window);
//  addEventListener("message", sitetran.close_tran_window, false);
};//}}}


// This populates sitetran languages to the sitetran.widget
// there is no need to modify or replace this function sitetran.widget function to add a widget new widget.
// because this function uses the sitetran.widget_add and empty functions.
sitetran.widget_populate_languages = function (callback) {//{{{
  // make sure we have the data.
  var lang_list, sitetran_data;
  if (sitetran.translation_mode == 'dev') {
    if (!sitetran.do_we_have_the_json_data('widget-', sitetran.translation_mode)) return sitetran.language_list_update(function () { sitetran.widget_populate_languages(callback); });
    sitetran_data = sitetran.dev_data;
  } else {
    if (!sitetran.do_we_have_the_json_data('widget-', sitetran.translation_mode)) return sitetran.language_list_update(function () { sitetran.widget_populate_languages(callback); });
    sitetran_data = sitetran.prod_data;
  }
  lang_list = sitetran.get_lang_list();

  sitetran.tree_modified_listener_remove();

  sitetran.widget_empty();


  //populating the widget.
  for (var i = 0; i < lang_list.length; i++) {
    var language_code = lang_list[i].language_code;


    if ( // todo. remove these phony lang codes from the json file and then remove this code. very simple housekeeping.
      !language_code
      ||
      language_code == 'null'
      ||
      language_code == 'Select Language'
      ||
      language_code == 'Translate Site'
      ||
      language_code == 'Stop Translating'
    ) {
      continue;
    }



    if (
      // does it not show up for a developer?
      sitetran.translation_mode == 'dev'
      &&
      sitetran_data.site_lang[language_code]
      &&
      sitetran_data.site_lang[language_code].sl_is_active != "Y"
    ) continue;


    if (
      // does it not show up in production?
      sitetran.translation_mode == 'prod'
      &&
      sitetran_data.site_lang[language_code]
      &&
      sitetran_data.site_lang[language_code].sl_is_production != 'Y'
    ) continue;



    var value = lang_list[i].language_code;
    var text;
    if (lang_list[i].language_format_name == 'null') {
      text = lang_list[i].language_name;
    } else {
      text = lang_list[i].language_format_name;
    }

    var is_selected = sitetran.lang == lang_list[i].language_code;

    sitetran.widget_add(text, value, is_selected);
  }

  sitetran.tree_modified_listener_add();

  if (callback) callback();
};//}}}

var sitetran_had_a_double_click = 0;
sitetran.handle_translation_dblclick = function (event, selected_language_code) {//{{{
  event.stopPropagation();
  sitetran_had_a_double_click = 1;

  var target = event.target || event.srcElement;
  var sitetran_original_phrase_arr = [];
  var index = 0;
  if (!sitetran.dev_data) {
    console.warn("sitetran: we do not have the dev_data yet.");
    return;
  }

  for (var i = 0; i < target.childNodes.length; i++) {
    var node = target.childNodes[i];
    if (node.nodeType == 3 && typeof node.nodeValue != 'undefined' && sitetran.non_whitespace_matcher.test(node.nodeValue)) {
      var nodeText = node.nodeValue;
      var nodeContent = nodeText.replace(sitetran.whitespace_matcher, " ");
      sitetran_original_phrase_arr.push(nodeContent);
    }
  }

  var tipValue = sitetran_original_phrase_arr.indexOf("Translate this phrase");
  if (tipValue > -1 || sitetran_original_phrase_arr.length === 0) {
    return;
  }
  if (sitetran_original_phrase_arr.length > 0) {
    sitetran.do_translation_dialog(target, event.target.tagName, sitetran_original_phrase_arr, selected_language_code, sitetran.site_default_language_code, index);
  }
  return false;
};//}}}

// this finds which text node this node is.
// it does this by counting backwards until it reaches the first text node.
// it starts at 0.


sitetran.find_node_index = function (node) {//{{{
  if (node.nodeType !== 3) return 0;  // only text nodes phrase_ids are saved in a list

  var i = 0;

  while (node.previousSibling) {
    node = node.previousSibling;
    if (node.nodeType === 3 && typeof node.nodeValue !== "undefined") i++;
  }
  return i;
};//}}}

sitetran.do_translation_dialog = function (element, tag_name, sitetran_original_phrase_arr, selected_language_code, _site_default_language_code, index) {//{{{
  if (typeof selected_language_code == "undefined" || !selected_language_code || selected_language_code == "null") return; // if the user hasn't chosen a language then we don't know what he wants to translate to.

  if (!sitetran.dev_data) return; // return and do nothing, if you try opening a dialog when not in dev mode.

  var example_url = "";
  var example_instructions = "";
  var phrase_ids = [];
  var src_lang_ids = [];
  var target_lang_ids = [];
  var ps_selecotr_ids = [];
  var ps_selectors = [];
  var ps_urls = [];

  var source_text = [];
  var translation_text = [];
  //Adding tool tip to the each text node in the page

  if (tag_name == 'OPTION') {
    // todo:  let's carefully translate option elements. the value is all the server should care about.
    return;
  }

  // we get the phrase_ids from the attribute.
  var sitetran_phrase_ids_str = element.sitetran_phrase_ids;
  var sitetran_phrase_ids = [];
  if (sitetran_phrase_ids_str) {
    sitetran_phrase_ids = sitetran_phrase_ids_str.split(",");
  }

  // we set up the parameters for the dialog
  for (var n = 0; n < sitetran_original_phrase_arr.length; n++) {
    var phrase_id = sitetran_phrase_ids[n];

    if (typeof phrase_id != "undefined" && phrase_id && phrase_id != "0") {
      // we have a phrase_id from the attribute. so let's use it.
      phrase_ids.push(phrase_id);

      if (sitetran.dev_data.phrase_lang_lookup[_site_default_language_code][phrase_id].phrase_example_instructions) example_instructions = sitetran.dev_data.phrase_lang_lookup[_site_default_language_code][phrase_id].phrase_example_instructions;


      if (
        typeof sitetran.dev_data.phrase_lang_lookup[selected_language_code] !== "undefined"
        &&
        typeof sitetran.dev_data.phrase_lang_lookup[selected_language_code][phrase_id] !== "undefined"
      ) {
        //console.log(sitetran.dev_data.phrase_lang_lookup);
        translation_text.push(sitetran.dev_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_text);
        target_lang_ids.push(sitetran.dev_data.phrase_lang_lookup[selected_language_code][phrase_id].phrase_lang_id);
      } else {
        translation_text.push("");
        target_lang_ids.push("notargetlangid");
      }
      src_lang_ids.push(sitetran.dev_data.phrase_lang_lookup[sitetran.dev_data.source_lang_lookup.language_code][phrase_id].phrase_lang_id);


      // this looks like a handy idea.

      if (typeof sitetran.dev_data.phrase_selector_lookup[phrase_id] !== "undefined"
        && sitetran.dev_data.phrase_selector_lookup[phrase_id][0].ps_selector !== "undefined"
      ) {
        ps_urls.push(sitetran.dev_data.phrase_selector_lookup[phrase_id][0].ps_url); // aaa, why the 0th? need to find which!
        ps_selectors.push(sitetran.dev_data.phrase_selector_lookup[phrase_id][0].ps_selector); // aaa, why the 0th? need to find which!
        ps_selecotr_ids.push(sitetran.dev_data.phrase_selector_lookup[phrase_id][0].phrase_selector_id);
      } else {
        ps_selectors.push(tag_name);
        ps_urls.push("");
        ps_selecotr_ids.push("noselectorid");
      }
      source_text.push(sitetran.dev_data.phrase_lang_lookup[_site_default_language_code][phrase_id].phrase_lang_text);
    } else {
      // this is a new phrase without a phrase_id

      phrase_ids.push('nophrase'); // aaa, why not use empty strings?

      translation_text.push('');
      src_lang_ids.push('nosrclangid');
      target_lang_ids.push('notargetlangid');

      ps_selectors.push(tag_name);
      ps_urls.push("");
      ps_selecotr_ids.push("noselectorid");

      source_text.push(sitetran_original_phrase_arr[n]);
    }

    example_url = window.location.href;
  }
  // console.log('parent', sitetran.dev_data)

  // console.log('sitetran.dev_data.source_lang_lookup.language_code', sitetran.dev_data.source_lang_lookup.language_code)
  // console.log('log data', sitetran.dev_data.site_lang[ sitetran.dev_data.source_lang_lookup.language_code ].language_name)


  sitetran.translatephrase_dialog({
    phrase_ids,
    src_lang_ids,
    target_lang_ids,
    source_text,
    translation_text,
    selected_language_code,
    dest_language_name: sitetran.dev_data.language_code[selected_language_code].language_name, // WEIRD: this should be the language_code not the name. need to change backend too.
    src_lang_code: sitetran.dev_data.source_lang_lookup.language_code,
    src_language_name: sitetran.dev_data.language_code[sitetran.dev_data.source_lang_lookup.language_code].language_name,
    ps_selectors,
    ps_selecotr_ids,
    example_url,
    example_instructions,
    ps_urls,
  });
};//}}}

// during translation mode, when someone  doubleclicks i want the singeclick event to not happen.
// i therefore am adding a timer to single clicks and only firing the single click after waiting with the timer to make sure it's not part of a double click.
sitetran.fixdblclick = function (element) {//{{{
  var new_onclick;
  var the_link;

  if ( element.nodeName == 'LINK' ) return;
  
  if (typeof element.ondblclick != "undefined") {
    // we only need to fix dblclicks that have single clicks.

    if (typeof element.href != "undefined" && element.href != 'javascript:void(0);') {
      the_link = element.href;
      element.onclick = function () {
        sitetran.single_click_step_1(function () {
          sitetran.single_click_step_2_func(the_link);
        });
      };
      element.href = 'javascript:void(0);';
    }

    if (typeof element.onclick != "undefined") {
    }
  }

  var children = element.children;
  for (var i = 0; i < children.length; i++) {
    sitetran.fixdblclick(children[i]);
  }
};//}}}

sitetran.add_dblclick = function (element, selected_language_code) { //{{{

  if (typeof element == "undefined" || !element || element.id == "sitetran_translate_element") return;
  // If element is a text element  

  var contents = element.childNodes;
  for (var i = 0; i < contents.length; i++) {
    if (contents[i].nodeType == 3 && typeof contents[i].nodeValue != 'undefined' && sitetran.non_whitespace_matcher.test(contents[i].nodeValue)) {
      element.ondblclick = function (event) {
        return sitetran.handle_translation_dblclick(event, selected_language_code);
      };
      break;
    }
  }

  var children = element.children;
  for (var j = 0; j < children.length; j++) {
    sitetran.add_dblclick(children[j], selected_language_code);
  }
};//}}}

var sitetran_last_click_msecs = 0;
sitetran.single_click_step_1 = function (a_sitetran_single_click_step_2_func) {//{{{
  if (sitetran_last_click_msecs > Date.now() - 500) return;
  sitetran_last_click_msecs = Date.now();

  setTimeout(
    a_sitetran_single_click_step_2_func,
    500
  );
  return 1;
};//}}}

sitetran.single_click_step_2_func = function (target_url) {//{{{
  if (sitetran_had_a_double_click) {
    sitetran_had_a_double_click = 0;
    return;
  }
  window.location = target_url;
};//}}}

sitetran.poll_cookie_change = function () {
  var language_code = sitetran.cookie_read("sitetran.lang");
  if (language_code && language_code != sitetran.widget_get_language_code()) {
    sitetran.widget_set_language_code(language_code);
    sitetran.onchange_action(false);
  }
};

sitetran.poll_cookie_change_timer = function () {
  // make sure change_seconds is long enough to finish changing languages and a breather.
  if (!sitetran.cookie_change_seconds) return;

  window.setTimeout(
    function () {
      sitetran.poll_cookie_change();
      sitetran.poll_cookie_change_timer();
    }
    , sitetran.cookie_change_seconds * 1000
  );
};


sitetran.translation_mode = sitetran.cookie_read("sitetran_translation_mode");



if (!sitetran.translation_mode || sitetran.translation_mode != 'dev') sitetran.translation_mode = 'prod';


if (!sitetran.widget_type) {
  window.sitetran.widget_type = 'select';
}


if (document.readyState != 'complete') {
  window.onload = function () {
    sitetran.language_list_update(sitetran.update_init);
  };
} else {
  sitetran.language_list_update(sitetran.update_init);
}

if (sitetran.widget_type === "list") {

  //Here we define the new list UI, for styled dropdown. The old functions get overwritten by these

  sitetran.get_parent_domain = function (domain) {
    return domain;
  };
  sitetran.widget = false;
  sitetran.widget_create_list = function () {
    if (!sitetran.widget) {
      var sitetran_element = document.getElementById("sitetran_translate_element");

      var sitetran_button = document.createElement("button");
      sitetran_button.className = "sitetran_translate_element_btn";
      sitetran_button.type = "button";
      sitetran_button.textContent = "English";
      sitetran.widget = document.createElement("ul");
      sitetran.widget.className = "sitetran_translate_list";

      sitetran_element.appendChild(sitetran_button);
      sitetran_element.appendChild(sitetran.widget);
      var isOpenedButton = false;

      var switchLangInList = function (selected_index, li_element, clear) {
        for (let i = 0; i < li_element.length; i++) {
          if (selected_index === i && !clear) {
            li_element[i].scrollIntoView();
            li_element[i].style.backgroundColor = '#eee';
          } else {
            li_element[i].removeAttribute('style');
          }
        }
      };

      var getFirstLetter = function (el, attr) {
        if (attr) {
          return el.getAttribute('data-lang').charAt(0);
        }
        return el.textContent.charAt(0).toLocaleLowerCase();
      }

      // show/hide list with sitetran_button click
      sitetran_button.onclick = function () {
        var selected_index = -1;
        isOpenedButton = !isOpenedButton;
        sitetran.widget.style.display = isOpenedButton ? "block" : "none";

        if (isOpenedButton) {
          var li_element = document.querySelectorAll('.sitetran_translate_list li');
          for (var k = 0; k < li_element.length; k++) {
            if (li_element[k].classList.contains('sitetran_selected_item')) {
              selected_index = k;
              switchLangInList(k, li_element);
            }
          }
          // sitetran_element.addEventListener("click",)
          document.body.onkeydown = function (e) {
            if(sitetran.widget.style.display == 'block') {
              var key = e.key || e.keyCode;
              if (key === 38 || key === 'ArrowUp') { // top arrow
                e.preventDefault();
                selected_index = selected_index - 1 < 0 ? li_element.length - 1 : selected_index - 1;
              } else if (key === 40 || key === 'ArrowDown') { // down arrow
                e.preventDefault();
                selected_index = selected_index + 1 >= li_element.length ? 0 : selected_index + 1;
              } else if (key === 13|| key === 'Enter') { // enter
                return sitetran.widget_set_language_code(li_element[selected_index].getAttribute('data-lang'));
              }
              switchLangInList(selected_index, li_element);
              
            }
          };
          document.body.onkeypress = function (e) {
            if(sitetran.widget.style.display == 'block') {
              var key = e.key || String.fromCharCode(e.which);
              var pressed_key = key;
              pressed_key = pressed_key.toLocaleLowerCase();
              if (pressed_key !== '') {
                var arr = [];
                for (var k = 0; k < li_element.length; k++) {
                  if (pressed_key === getFirstLetter(li_element[k]) || pressed_key === getFirstLetter(li_element[k], true)) {
                    var no_english = pressed_key !== getFirstLetter(li_element[k]);
                    arr.push(k);
                  }
                }
                for (var l = 0; l < arr.length; l++) {
                  var i = arr[l];
                  var ff = arr.indexOf(selected_index);
                  var index_for_state = (ff !== -1 && selected_index !== arr[arr.length - 1]) ? selected_index : -1;
                  if (!li_element[i].hasAttribute('style') && selected_index !== i && i > index_for_state) {
                    switchLangInList(i, li_element);
                    selected_index = i;
                    l = arr.length; // end for 
                  }
                }
              }
            }
          }
        }
      };

      sitetran.widget_set_translator_toggle();

      // click outside of dropdown
      window.addEventListener("click", function (e) {
        if (!sitetran_translate_element.contains(e.target)) {
          isOpenedButton = false;
          sitetran.widget.style.display = "none";
          switchLangInList(false, document.querySelectorAll('.sitetran_translate_list li'), true);
        }
      });
    }
  };

  sitetran.max_width_lang = 0;

  sitetran.widget_add_list = function (language_name, language_code, is_selected) {
    // console.log('we created list again');
    if (is_selected) {
      var sitetran_button = document.querySelector(".sitetran_translate_element_btn");
      //  Not implemented, and should be sitetran.use_flags
      if (typeof sitetran_use_flags !== "undefined") {
        var li_img = document.createElement("img");
        li_img.setAttribute("src", "/images/flags/" + language_code + ".png");
        sitetran_selected_el.appendChild(li_img); //sitetran_selected_el is not defined.
      }

      sitetran_button.textContent = language_name;
    }

    var sitetran_li = document.createElement("li");
    sitetran_li.setAttribute('data-lang', language_code);
    var sitetran_array_langs = sitetran.prod_data.site_lang_list;

    for (var i = 0; i < sitetran_array_langs.length; i++) {
      if (sitetran_array_langs[i].language_code === language_code) {
        sitetran_li.setAttribute('dir', sitetran_array_langs[i].direction_code);
      }
    }
    if (typeof sitetran_use_flags !== "undefined") {
      var sitetran_img = document.createElement("img");
      sitetran_img.setAttribute("src", "/images/flags/" + language_code + ".png");
      sitetran_li.appendChild(sitetran_img);
    }
    if (is_selected) sitetran_li.className = "sitetran_selected_item";
    sitetran_li.appendChild(document.createTextNode(language_name));
    sitetran_li.onclick = function (ev) {
      sitetran.widget_set_language_code(language_code);
    };

    sitetran.widget.appendChild(sitetran_li);
    sitetran.widget.style.display = "block";
    var siteran_li_width = document.querySelector('.sitetran_translate_list li').clientWidth;
    var sitetran_btn_el = document.querySelector('.sitetran_translate_element_btn');
    // console.log(siteran_li_width, sitetran_btn_el);
    if (sitetran.max_width_lang === 0) {
      if (siteran_li_width > 123) {
        sitetran.max_width_lang = 124;
      } else {
        sitetran.max_width_lang = siteran_li_width + 2;
      }
    }
    sitetran_btn_el.style.width = sitetran.max_width_lang;
    sitetran.widget.style.display = "none";
  };
} 