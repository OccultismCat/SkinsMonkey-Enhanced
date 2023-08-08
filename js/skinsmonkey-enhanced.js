// ==UserScript==
// @name         SkinsMonkey Enhanced
// @namespace    https://github.com/OccultismCat/SkinsMonkey-Enhanced/
// @version      0.0.1
// @description  Make improvements to steamcommunity.com/market.
// @author       OccultismCat
// @license      CC-BY-ND-4.0
// @github       https://github.com/OccultismCat/SkinsMonkey-Enhanced/
// @homepage     https://greasyfork.org/en/scripts/
// @supportURL   https://github.com/OccultismCat/SkinsMonkey-Enhanced/issues
// @installURL   https://greasyfork.org/scripts/
// @updateURL    null
// @downloadURL  null
// @icon         https://skinsmonkey.com/_nuxt/img/logo-mini.96678c5.svg
// @match        https://skinsmonkey.com/free-csgo-skins
// ==/UserScript==
(function() {
    'use strict';
    const giveaway_join_buttons = []
    function locate_element(element){
        if (element != null && element != undefined){
            return true;
        } else {
            return false;
        }
    }
    window.addEventListener('load', () => {
        const page_background = document.querySelector("#__layout > div")
        if (locate_element(page_background) == true){
            page_background.style = 'background-color: black;'
        }
        const giveaway_grid = document.querySelector("#__layout > div > div.container.free.main > section.free-section.free-giveaways > div.free-section__body > div")
        if (locate_element(giveaway_grid) == true){
            var giveaway_array = Array.from(giveaway_grid.children)
            giveaway_array.forEach(function(giveaway){
                var giveaway_join_button = giveaway.children[1].children[1].children[1]
                giveaway_join_buttons.push(giveaway_join_button)
                var giveaway_enhanced_button = document.createElement('button')
                giveaway_enhanced_button.textContent = 'Auto Join'
                giveaway_enhanced_button.style = 'cursor: pointer;color: green;background-color: black;width: 100%;height: 15%;font-variant: petite-caps;border-color: currentColor;'
                giveaway_enhanced_button.className = 'fa-border fa-xl noUi-base'
                giveaway_enhanced_button.onclick = function (){
                    var joined_giveaway = false
                    var joined_giveaway_free_entry = false
                    var joined_giveaway_email_entry = false
                    giveaway_enhanced_button.textContent = 'Joining Giveaway!'
                    giveaway_join_button.click();
                    var join_entries = setInterval(function (){
                        if (joined_giveaway != true){
                            var giveaway_entries_list = document.querySelector("#__layout > div > div.modal.modal--free-giveaway > div > div > div > div > div.modal-free-giveaway.modal__core > div.modal-body.modal-free-giveaway__body > div.expand-multiple > div > div.free-giveaway-requirements__body")
                            if (locate_element(giveaway_entries_list) == true){
                                var giveaway_entries_list_free_entry = giveaway_entries_list.children[0]
                                if (locate_element(giveaway_entries_list_free_entry.children[0]) == true){
                                    giveaway_entries_list_free_entry.children[0].style = 'background-color: black;'
                                    giveaway_entries_list_free_entry.children[0].click();
                                    setTimeout(function (){
                                        var giveaway_entries_list_free_entry_claim_button = giveaway_entries_list_free_entry.children[1].children[0].children[1].children[0].children[0]
                                        var close_giveaway_list_button = document.querySelector("#__layout > div > div.modal.modal--free-giveaway > div > div > div > div > div.modal__close")
                                        if (locate_element(giveaway_entries_list_free_entry_claim_button) == true){
                                            console.log(giveaway_entries_list_free_entry_claim_button)
                                            if (giveaway_entries_list_free_entry_claim_button.textContent.match(/Next Claim/) != null){
                                                giveaway_entries_list_free_entry_claim_button.style = 'background-color: red;'
                                                giveaway_enhanced_button.style.color = 'red';
                                            } else {
                                                giveaway_entries_list_free_entry_claim_button.style = 'background-color: gold;'
                                                giveaway_entries_list_free_entry_claim_button.click();
                                            }
                                            setTimeout(function() {
                                                close_giveaway_list_button.click();
                                                giveaway_enhanced_button.textContent = giveaway_entries_list_free_entry_claim_button.textContent
                                            }, 1000)
                                        }
                                    }, 250)
                                joined_giveaway = true
                                }
                            }
                        } else {
                            clearInterval(join_entries);
                            console.log('Cleared Interval')
                        }
                    }, 500)
                }
                console.log('Adding Enhanced Button!')
                console.log(giveaway_enhanced_button)
                giveaway.appendChild(giveaway_enhanced_button)
            })
        }
    })
})();