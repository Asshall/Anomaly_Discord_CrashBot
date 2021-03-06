let vScripts = [
  "actor_effects.script",
  "actor_menu_inventory.script",
  "actor_menu.script",
  "actor_proxy.script",
  "actor_status.script",
  "actor_status_sleep.script",
  "actor_status_thirst.script",
  "alife_storage_manager.script",
  "arszi_psy.script",
  "axr_beh.script",
  "axr_companions.script",
  "axr_fight_from_cover.script",
  "axr_keybind.script",
  "axr_main.script",
  "axr_npc_vs_box.script",
  "axr_npc_vs_heli.script",
  "axr_radio_in_heli.script",
  "axr_stalker_panic.script",
  "axr_task_manager.script",
  "axr_trade_manager.script",
  "axr_turn_on_campfire.script",
  "bind_anomaly_field.script",
  "bind_anomaly_zone.script",
  "bind_awr.script",
  "bind_campfire.script",
  "bind_camp.script",
  "bind_car.script",
  "bind_container.script",
  "bind_crow.script",
  "bind_door_labx8.script",
  "bind_dynamic_light.script",
  "bind_dynamo_hand.script",
  "bind_faction.script",
  "bind_heli.script",
  "bind_item.script",
  "bind_level_changer.script",
  "bind_monster.script",
  "bind_physic_object.script",
  "bind_red_forest_bridge.script",
  "bind_restrictor.script",
  "bind_signal_light.script",
  "bind_smart_cover.script",
  "bind_smart_terrain.script",
  "bind_stalker_ext.script",
  "bind_stalker.script",
  "bind_trader.script",
  "class_registrator.script",
  "closecaption.script",
  "combat_restrictor.script",
  "cover_manager.script",
  "db.script",
  "death_manager.script",
  "debug_cmd_list.script",
  "dialog_manager.script",
  "dialogs_agr_u.script",
  "dialogs_axr_companion.script",
  "dialogs_bar.script",
  "dialogs_darkvalley.script",
  "dialogs_devushka.script",
  "dialogs_escape.script",
  "dialogs_jupiter.script",
  "dialogs_lostzone.script",
  "dialogs_marsh.script",
  "dialogs_mlr.script",
  "dialogs_pripyat.script",
  "dialogs.script",
  "dialogs_warlab.script",
  "dialogs_yantar.script",
  "dialogs_zaton.script",
  "dynamic_news_helper.script",
  "dynamic_news_manager.script",
  "faction_expansions.script",
  "game_achievements.script",
  "game_autosave_new.script",
  "game_autosave.script",
  "game_backpack_travel.script",
  "game_difficulties.script",
  "game_fast_travel.script",
  "gamemode_agony.script",
  "gamemode_azazel.script",
  "gamemode_ironman.script",
  "gamemode_timer.script",
  "gameplay_disguise.script",
  "gameplay_radioactive_water.script",
  "gameplay_silent_kills.script",
  "game_registrator.script",
  "game_relations.script",
  "game_setup.script",
  "game_statistics.script",
  "global_position.script",
  "_g.script",
  "guaranteed_loot.script",
  "gulag_general.script",
  "gwr_worldweapon_binder.script",
  "heli_alife.script",
  "heli_alife_warfare.script",
  "heli_combat.script",
  "heli_fire.script",
  "heli_fly.script",
  "heli_look.script",
  "heli_move.script",
  "heli_snd.script",
  "info_portions.script",
  "inventory_upgrades.script",
  "item_artefact.script",
  "item_backpack.script",
  "item_cooking.script",
  "item_device.script",
  "item_knife.script",
  "item_map_kit.script",
  "item_mine.script",
  "item_money.script",
  "item_parts.script",
  "item_radio.script",
  "item_recipe.script",
  "item_repair.script",
  "item_tent.script",
  "item_weapon.script",
  "itms_manager.script",
  "ka_dialog.script",
  "ka_travel_dialog.script",
  "ka_travel.script",
  "level_environment.script",
  "level_input.script",
  "level_targets.script",
  "level_weathers.script",
  "loadscreen.script",
  "logic_enforcer.script",
  "lua_extensions.script",
  "lua_ext.script",
  "lua_help.script",
  "medic_effects.script",
  "memusage.script",
  "mlr_utils.script",
  "mob_camp.script",
  "mob_combat.script",
  "mob_death.script",
  "mob_home.script",
  "mob_jump.script",
  "mob_remark.script",
  "mob_sound.script",
  "mob_state_mgr.script",
  "mob_trader.script",
  "mob_trade.script",
  "mob_walker.script",
  "modules.script",
  "move_mgr.script",
  "news_manager.script",
  "pda_actor.script",
  "pda_flagger.script",
  "pda.script",
  "pda_smart_terrain_warfare.script",
  "phantom_manager.script",
  "ph_appforce.script",
  "ph_button.script",
  "ph_car_original.scriptx",
  "ph_car.script",
  "ph_code.script",
  "ph_death.script",
  "ph_door.script",
  "ph_hit.script",
  "ph_idle.script",
  "ph_minigun.script",
  "ph_on_hit.script",
  "ph_oscillate.script",
  "ph_sound.script",
  "post_combat_idle.script",
  "psi_storm_manager.script",
  "ranks.script",
  "release_body_manager.script",
  "release_item_manager.script",
  "release_npc_inventory.script",
  "restrictor_manager.script",
  "rx_ff.script",
  "safe_release_manager.script",
  "se_actor.script",
  "se_artefact.script",
  "se_car.script",
  "se_heli.script",
  "se_item.script",
  "se_level_changer.script",
  "se_monster.script",
  "se_smart_cover.script",
  "se_stalker.script",
  "se_zones.script",
  "sim_board.script",
  "sim_offline_combat.script",
  "sim_squad_bounty.script",
  "sim_squad_scripted.script",
  "sim_squad_warfare.script",
  "simulation_objects.script",
  "smart_covers_animpoint_pri_a15.script",
  "smart_covers_animpoint_sit_ass.script",
  "smart_covers_animpoint_sit_high.script",
  "smart_covers_animpoint_sit_knee.script",
  "smart_covers_animpoint_sit_low.script",
  "smart_covers_animpoint_sit_normal.script",
  "smart_covers_animpoint_sit.script",
  "smart_covers_animpoint_sit_wait.script",
  "smart_covers_animpoint_stay_bar.script",
  "smart_covers_animpoint_stay_ohrana.script",
  "smart_covers_animpoint_stay_table.script",
  "smart_covers_animpoint_stay_wait.script",
  "smart_covers_animpoint_stay_wall.script",
  "smart_covers_anim_pri_a22.script",
  "smart_covers_combat_front.script",
  "smart_covers_combat_prone.script",
  "smart_covers_combat.script",
  "smart_covers_cover_lesnik.script",
  "smart_covers_cover_loophole_lead_forester_idle_talk.script",
  "smart_covers_loophole_animpoint_pri_a15.script",
  "smart_covers_loophole_animpoint_sit_ass.script",
  "smart_covers_loophole_animpoint_sit_high.script",
  "smart_covers_loophole_animpoint_sit_knee.script",
  "smart_covers_loophole_animpoint_sit_low.script",
  "smart_covers_loophole_animpoint_sit_normal.script",
  "smart_covers_loophole_animpoint_sit.script",
  "smart_covers_loophole_animpoint_sit_wait.script",
  "smart_covers_loophole_animpoint_stay_bar.script",
  "smart_covers_loophole_animpoint_stay_ohrana.script",
  "smart_covers_loophole_animpoint_stay_table.script",
  "smart_covers_loophole_animpoint_stay_wait.script",
  "smart_covers_loophole_animpoint_stay_wall.script",
  "smart_covers_loophole_anim_pri_a22.script",
  "smart_covers_loophole_crouch_back.script",
  "smart_covers_loophole_crouch_front_left.script",
  "smart_covers_loophole_crouch_front_right.script",
  "smart_covers_loophole_crouch_front.script",
  "smart_covers_loophole_crouch_left.script",
  "smart_covers_loophole_crouch_right.script",
  "smart_covers_loophole_lead_forester_idle.script",
  "smart_covers_loophole_lead_forester_talk.script",
  "smart_covers_loophole_lesnik.script",
  "smart_covers_loophole_prone.script",
  "smart_covers_loophole_stand_back.script",
  "smart_covers_loophole_stand_front_left.script",
  "smart_covers_loophole_stand_front_right.script",
  "smart_covers_loophole_stand_left.script",
  "smart_covers_loophole_stand_right.script",
  "smart_covers.script",
  "smart_terrain.script",
  "smart_terrain_warfare.script",
  "sound_ambient.script",
  "sound_manager.script",
  "sound_theme.script",
  "spawn_nimble_items.script",
  "sr_camp.script",
  "sr_crow_spawner.script",
  "sr_cutscene.script",
  "sr_deimos.script",
  "sr_idle.script",
  "sr_light.script",
  "sr_monster.script",
  "sr_no_weapon.script",
  "sr_particle.script",
  "sr_postprocess.script",
  "sr_psy_antenna.script",
  "sr_silence.script",
  "sr_teleport.script",
  "sr_timer.script",
  "stalker_generic.script",
  "state_lib_animpoint.script",
  "state_lib.script",
  "state_mgr_animation_list_animpoint.script",
  "state_mgr_animation_list.script",
  "state_mgr_animation.script",
  "state_mgr_animstate_list_animpoint.script",
  "state_mgr_animstate_list.script",
  "state_mgr_animstate.script",
  "state_mgr_bodystate.script",
  "state_mgr_direction.script",
  "state_mgr_goap.script",
  "state_mgr_mental.script",
  "state_mgr_movement.script",
  "state_mgr_pri_a15.script",
  "state_mgr_scenario.script",
  "state_mgr.script",
  "state_mgr_smartcover.script",
  "state_mgr_weapon.script",
  "story_objects.script",
  "surge_manager.script",
  "task_functor.script",
  "task_manager.script",
  "task_objects.script",
  "tasks_agent_rescue.script",
  "tasks_anomaly_scanner.script",
  "tasks_assault.script",
  "tasks_bounty.script",
  "tasks_chimera_scan.script",
  "tasks_clear_map.script",
  "tasks_defense.script",
  "tasks_delivery.script",
  "tasks_dominance.script",
  "tasks_faction_control.script",
  "tasks_fate.script",
  "tasks_fetch.script",
  "tasks_guide.script",
  "tasks_measure.script",
  "tasks_multifetch.script",
  "tasks_pump_station_defense.script",
  "tasks_recover_item_on_corpse.script",
  "tasks_recover_mutant_data.script",
  "tasks_smart_control.script",
  "tasks_stash.script",
  "task_status_functor.script",
  "tasks_top_10.script",
  "tasks_veh_destroy.script",
  "trade_manager.script",
  "trans_outfit.script",
  "treasure_manager.script",
  "txr_mines.script",
  "txr_paid_companions.script",
  "txr_routes.script",
  "ui_companion_inv.script",
  "ui_ctrl_lighting.script",
  "ui_debug_item.script",
  "ui_debug_launcher.script",
  "ui_debug_lighting.script",
  "ui_debug_main.script",
  "ui_debug_weather.script",
  "ui_debug_wpn_hud.script",
  "ui_dosimeter.script",
  "ui_dyn_msg_box.script",
  "ui_enemy_health.script",
  "ui_extra.script",
  "ui_freeplay_dialog.script",
  "ui_inventory.script",
  "ui_item.script",
  "ui_itm_details.script",
  "ui_load_dialog.script",
  "ui_main_menu.script",
  "ui_map_debug_ex.script",
  "ui_mm_faction_select.script",
  "ui_mutant_loot.script",
  "ui_numpad.script",
  "ui_options.script",
  "ui_pda_contacts_tab.script",
  "ui_pda_encyclopedia_tab.script",
  "ui_pda_npc_tab.script",
  "ui_pda_radio_tab.script",
  "ui_pda_relations_tab.script",
  "ui_pda_warfare_tab.script",
  "ui_registrator.script",
  "ui_save_dialog.script",
  "ui_scenes.script",
  "ui_sleep_dialog.script",
  "ui_sr_teleport.script",
  "ui_warfare_options_hints.script",
  "ui_workshop.script",
  "ui_wpn_params.script",
  "utils_data.script",
  "utils_item.script",
  "utils_obj.script",
  "utils_stpk.script",
  "utils_ui.script",
  "utils_xml.script",
  "visual_memory_manager.script",
  "warfare_faction_control.script",
  "warfare_factions.script",
  "warfare_levels.script",
  "warfare_names.script",
  "warfare_options.script",
  "warfare.script",
  "xr_abuse.script",
  "xr_actions_id.script",
  "xr_animpoint_predicates.script",
  "xr_animpoint.script",
  "xr_box.script",
  "xr_bribe.script",
  "xr_camper.script",
  "xr_campfire_point.script",
  "xr_combat_camper.script",
  "xr_combat_ignore.script",
  "xr_combat_monolith.script",
  "xr_combat.script",
  "xr_combat_zombied.script",
  "xr_companion.script",
  "xr_conditions_addon.script",
  "xr_conditions.script",
  "xr_corpse_detection.script",
  "xr_cover.script",
  "xr_danger.script",
  "xr_death.script",
  "xr_detector.script",
  "xr_eat_medkit.script",
  "xr_effects_addon.script",
  "xr_effects.script",
  "xr_evaluators_id.script",
  "xr_gather_items.script",
  "xr_gulag.script",
  "xr_hear.script",
  "xr_help_wounded.script",
  "xr_hit.script",
  "xr_logic.script",
  "xr_meet.script",
  "xr_motivator.script",
  "xr_patch.script",
  "xr_patrol.script",
  "xr_reach_task.script",
  "xr_remark.script",
  "xrs_debug_tools.script",
  "xrs_dyn_music.script",
  "xrs_facer.script",
  "xrs_kill_wounded.script",
  "xr_sleeper.script",
  "xr_smartcover.script",
  "xr_sound.script",
  "xrs_rnd_npc_loadout.script",
  "xr_state.script",
  "xr_walker.script",
  "xr_weapon_jam.script",
  "xr_wounded.script",
  "xr_zones.script",
  "xr_zones_sound.script",
// ]
// let efpScripts = [
  "gameplay_disguise.script",
  "ui_inventory.script",
  "xr_meet.script",
  "xr_wounded.script",
  "ayykyu_voiced_actor.script",
  "ui_addon_companion_quick_menu.script",
  "arszi_mutant_bleeding.script",
  "arszi_rotten_meat.script",
  "arszi_campfire_roasting.script",
  "bind_campfire.script",
  "ammo_maker.script",
  "arti_debug_mcm.script",
  "bas_adder.script",
  "workshop_autoinject.script",
  "arszi_psy.script",
  "cozy_campfire.script",
  "actor_status_thirst.script",
  "food_poisoning.script",
  "food_poison_mcm.script",
  "mutant_decoctions.script",
  "speed.script",
  "trader_autoinject.script",
  "workshop_autoinject.script",
  "speed.script",
  "trader_autoinject.script",
  "ui_pda_autoinject.script",
  "workshop_autoinject.script",
  "arti_lootboxes.script",
  "arti_lootboxes_mcm.script",
  "a_lootbox_loot.script",
  "custom_loot.script",
  "pickset_binder.script",
  "actor_status_thirst.script",
  "armor_inserts.script",
  "arti_ass_control.script",
  "arti_cond_binder.script",
  "arti_frames_control.script",
  "arti_slot_control.script",
  "arti_slot_control_mcm.script",
  "arti_slot_loot.script",
  "autodoc_binder.script",
  "camelbak_binder.script",
  "surge_protector.script",
  "trader_autoinject.script",
  "workshop_autoinject.script",
  "outfit_drop_mcm.script",
  "armor_ripper.script",
  "arti_outfits.script",
  "arti_outfits_mcm.script",
  "game_diff_override.script",
  "inventory_upgrades_mp.script",
  "monke_patch_ui.script",
  "trader_autoinject.script",
  "ui_pda_autoinject.script",
  "workshop_outfits.script",
  "zzzzz_arti_outfit_repair.script",
  "monke_patch_ui.script",
  "outfit_speed.script",
  "outfit_speed_mcm.script",
  "speed.script",
  "exo_loot.script",
  "exo_mcm.script",
  "exo_powers.script",
  "exo_power_activator_mcm.script",
  "exo_servo_sounds.script",
  "exo_servo_sounds_mcm.script",
  "item_exo_device.script",
  "pba_patch.script",
  "speed.script",
  "trader_autoinject.script",
  "ui_pda_autoinject.script",
  "workshop_autoinject.script",
  "arti_debug_mcm.script",
  "recipe_mines.script",
  "remote_mines.script",
  "trader_autoinject.script",
  "workshop_autoinject.script",
  "aaaa_monkeys.script",
  "arti_debug_mcm.script",
  "kit_binder.script",
  "upgrades_mcm.script",
  "workshop_autoinject.script",
  "arti_workshop_tool.script",
  "arti_jamming.script",
  "a_arti_jamming_mcm.script",
  "a_wpo_parts.script",
  "clear_jam_mcm.script",
  "custom_functor_autoinject.script",
  "game_diff_override.script",
  "inventory_upgrades_mp.script",
  "mag_support.script",
  "trader_autoinject.script",
  "ui_pda_autoinject.script",
  "utils_ui_custom.script",
  "wpo_loot.script",
  "zzzz_arti_jamming_repairs.script",
  "ayykyu_screen_effects.script",
  "alticons.script",
  "ui_minimap_counter.script",
  "item_device.script",
  "z_beefs_nvgs.script",
  "z_beefs_nvgs_mcm.script",
  "actor_effects.script",
  "dynamic_news_manager.script",
  "actor_status_thirst.script",
  "zzz_player_injuries.script",
  "pepega_script_soup.script",
  "psi_storm_manager.script",
  "companion_anti_awol.script",
  "companion_anti_awol_mcm.script",
  "ui_debug_wpn_hud.script",
  "smart_terrain.script",
  "death_manager.script",
  "quick_tp_companions_mcm.script",
  "bind_crow.script",
  "quickdraw_mcm.script",
  "screamback_mcm.script",
  "arszi_campfire_roasting.script",
  "a_faction_prices.script",
  "box_aggregation.script",
  "efp_med_workshop.script",
  "maid_helmis_inject.script",
  "sr_camp.script",
  "trade_manager.script",
  "utils_ui.script",
  "xr_meet.script",
  "xr_wounded.script",
  "zzz_bas_laser_control.script",
  "ui_options.script",
  "armor_ripper.script",
  "exo_loot.script",
  "hides_workshop.script",
  "mutant_decoctions.script",
  "recipe_mines.script",
  "zzz_player_injuries.script",
  "grok_bo_enhanced_recoil.script",
  "take_item_anim.script",
  "surge_manager.script",
  "ciga_effects.script",
  "enhanced_animations.script",
  "fov_anim_manager.script",
  "take_item_anim.script",
  "ui_sleep_dialog.script",
  "xr_reach_task.script",
  "gameplay_peace_zone.script",
  "lc_custom.script",
  "actor_effects.script",
  "xrs_facer.script",
  "xr_meet.script",
  "grok_bo.script",
  "grok_bo_eft_hit_effects.script",
  "grok_bo_enhanced_recoil.script",
  "aaa_grok_bhsr_mask_fix_hud.script",
  "ab_move_notification.script",
  "itms_manager.script",
  "speed.script",
  "zzz_player_injuries.script",
  "zzz_player_injuries_mcm.script",
  "trade_manager.script",
  "grok_masks_reflections.script",
  "grok_navs_masks_enabler.script",
  "grok_stashes_on_corpses.script",
  "treasure_manager.script",
  "eft_jump_sounds.script",
  "eft_jump_sounds_mcm.script",
  "haruka_fill.script",
  "show_camfires.script",
  "exo_servo_sounds.script",
  "exo_servo_sounds_mcm.script",
  "z_npc_footsteps.script",
  "a_faction_prices.script",
  "deal_manager.script",
  "faction_economy_mcm.script",
  "faction_stocks.script",
  "faction_trade_ui.script",
  "haru_ammo_spawns.script",
  "trader_autoinject.script",
  "reload_hint.script",
  "haru_skills.script",
  "haru_skills_mcm.script",
  "speed.script",
  "ui_haru_skills.script",
  "weight.script",
  "haru_zoom.script",
  "zz_warfare_mech_fix.script",
  "hxf_tough_important_npcs.script",
  "tinpc_mcm.script",
  "camera_reanim_project.script",
  "camera_reanim_project_mcm.script",
  "igi_target_scout_arszi.script",
  "igi_actions_basic.script",
  "igi_activities.script",
  "igi_ara.script",
  "igi_callbacks.script",
  "igi_conditions.script",
  "igi_conditions_basic.script",
  "igi_db.script",
  "igi_description.script",
  "igi_finder.script",
  "igi_generic_task.script",
  "igi_helper.script",
  "igi_json.script",
  "igi_linker.script",
  "igi_macros.script",
  "igi_mcm.script",
  "igi_models.script",
  "igi_precondition.script",
  "igi_random.script",
  "igi_rewards.script",
  "igi_setup.script",
  "igi_subtask.script",
  "igi_target.script",
  "igi_target_assault.script",
  "igi_target_basic.script",
  "igi_target_fetch.script",
  "igi_target_get.script",
  "igi_target_kill.script",
  "igi_target_return.script",
  "igi_taskdata.script",
  "igi_text_processor.script",
  "igi_utils.script",
  "zzz_igi_monkeypatches.script",
  "zzz_igi_gt_monkeypatches.script",
  "dynamic_news_manager.script",
  "ui_item.script",
  "loadscreen.script",
  "ish_firemode.script",
  "ish_firemode_mcm.script",
  "ish_kill_tracker.script",
  "ish_char_name_saves.script",
  "ish_eine_kleine_nah_music.script",
  "ish_fixed_bolt_manager.script",
  "ish_geiger_hush.script",
  "ish_item_stats.script",
  "ish_keep_bolts.script",
  "ish_level_input.script",
  "ish_pistol_equip_override.script",
  "ish_read_watch.script",
  "ish_total_weights.script",
  "ish_ui_mutant_loot.script",
  "ish_xr_effects_wishes.script",
  "monke_patch_ui.script",
  "xrs_dyn_music.script",
  "ish_toggle_scope_mcm.script",
  "ish_campfire_saving.script",
  "ish_campfire_saving_mcm.script",
  "smooth_prog_mcm.script",
  "upgrade_rank_pricing.script",
  "trader_autoinject.script",
  "zz_glowstick_mcm.script",
  "axr_companions.script",
  "ui_inventory.script",
  "game_statistics.script",
  "eft_item_boxes.script",
  "hides_workshop.script",
  "maid_item_inject.script",
  "trader_autoinject.script",
  "bas_trade_inject.script",
  "item_knife.script",
  "trader_autoinject.script",
  "zzz_bas_laser_control.script",
  "mora_schemes.script",
  "xr_combat_camper.script",
  "xr_conditions.script",
  "ui_workshop.script",
  "arszi_campfire_roasting.script",
  "utils_ui.script",
  "eft_rattle.script",
  "eft_rattle_mcm.script",
  "actor_effects.script",
  "item_backpack.script",
  "zz_companion_inentory_remote_mcm.script",
  "rax_persistent_highlight.script",
  "zz_companion_inventory_fix_mcm.script",
  "zz_Cost_in_tool_tip.script",
  "dynamic_npc_armor_visuals.script",
  "remove_corpse_outfit.script",
  "rax_full_icon_artifact_belt.script",
  "tasks_guide.script",
  "he_is_with_me.script",
  "instant_tooltip.script",
  "rax_inventory_highlights_mcm.script",
  "rax_persistent_highlight.script",
  "binoc_pistol_knife.script",
  "dph_mcm_save_storage.script",
  "mcm_log.script",
  "ui_main_menu.script",
  "ui_mcm.script",
  "nomorefreindlyfire_mcm.script",
  "rax_dynamic_custom_functor.script",
  "rax_icon_layers.script",
  "rax_persistent_highlight.script",
  "zzz_rax_sortingplus_mcm.script",
  "mini_map_toggle_mcm.script",
  "dialogs_lostzone.script",
  "dynamic_news_manager.script",
  "surge_manager.script",
  "task_status_functor.script",
  "xr_effects.script",
  "fluid_aim.script",
  "dynamic_companion_carryweight.script",
  "scoping_hud_fov_mcm.script",
  "companion_ui_mcm.script",
  "matchbox_binder.script",
  "stands_hobomatches.script",
  "zzz_stands_patch.script",
  "g36pack_traderinject.script",
  "trader_autoinject.script",
  "dialogs_devushka.script",
  "utils_ui.script",
  "TB_Remove_Bugged_Stashes.script",
  "sr_light.script",
  "TB_Coordinate_Based_Safe_Zones.script",
  "tb_remove_the_tiny_cubes.script",
  "TB_Fairer_Thermal_Anomalies.script",
  "tb_new_stashes.script",
  "item_radio.script",
  "TB_RF_Receiver_Packages.script",
  "advanced_stamina_system_ass.script",
  "advanced_stamina_system_mcm.script",
  "speed.script",
  "combine_all_items.script",
  "custom_functor_autoinject.script",
  "disassemble_all_items.script",
  "lc_extra_transitions.script",
  "lc_extra_transitions_mcm.script",
  "zz_ui_itm_details_repair_bonuses.script",
  "demonized_time_events.script",
  "zz_item_cooking_keep_crafting_window_open.script",
  "zz_item_repair_keep_crafting_window_open.script",
  "zz_time_events_keep_crafting_window_open.script",
  "zz_ui_workshop_keep_crafting_window_open.script",
  "bind_crow.script",
  "ui_mutant_loot.script",
  "arszi_psy.script",
  "custom_functor_autoinject.script",
  "demonized_time_events.script",
  "perk_based_artefacts.script",
  "perk_based_artefacts_bone_mapper.script",
  "perk_based_artefacts_item_properties.script",
  "perk_based_artefacts_mcm.script",
  "speed.script",
  "weight.script",
  "zz_item_artefact.script",
  "zz_treasure_manager_pba_less_artys.script",
  "void_fmode_sound.script",
  "void_fmode_sound_mcm.script",
  "ui_pda_encyclopedia_tab.script",
  "bountysquads_mcm.script",
  "sim_squad_bounty.script",
  "npc_loot_claim.script",
  "dialogs.script",
  "faction_expansions.script",
  "game_fast_travel.script",
  "game_relations.script",
  "pda.script",
  "sim_offline_combat.script",
  "sim_squad_scripted.script",
  "sim_squad_warfare.script",
  "smart_terrain_warfare.script",
  "tasks_assault.script",
  "tasks_smart_control.script",
  "ui_mm_faction_select.script",
  "ui_options.script",
  "ui_pda_warfare_tab.script",
  "warfare.script",
  "warfare_factions.script",
  "warfare_monkeypatches.script",
  "warfare_options.script",
  "xr_logic.script",
  "wepl_hit_effect.script",
  "ui_sleep_dialog.script",
  "actor_status_sleep.script",
  "actor_status_thirst.script",
  "ui_inventory.script",
  "camp_lum.script",
  "light_gem_mcm.script",
  "stealth_mcm.script",
  "trans_outfit.script",
  "visual_memory_manager.script",
  "xr_combat_ignore.script",
  "game_achievements.script",
  "game_statistics.script",
  "yohji_persistent_weather.script",
  "gameplay_disguiseaaaa_monkeys.script.script",
  "aaa_grok_bhsr_mask_fix_hud.script.script",
  "a_arti_jamming_mcm.script.script",
  "ab_move_notification.script.script",
  "advanced_stamina_system_ass.script.script",
  "advanced_stamina_system_mcm.script.script",
  "a_faction_prices.script.script",
  "a_lootbox_loot.script.script",
  "alticons.script.script",
  "ammo_maker.script.script",
  "armor_inserts.script.script",
  "armor_ripper.script.script",
  "arszi_campfire_roasting.script.script",
  "arszi_mutant_bleeding.script.script",
  "arszi_rotten_meat.script.script",
  "arti_ass_control.script.script",
  "arti_cond_binder.script.script",
  "arti_debug_mcm.script.script",
  "arti_frames_control.script.script",
  "arti_jamming.script.script",
  "arti_lootboxes.script.script",
  "arti_lootboxes_mcm.script.script",
  "arti_outfits.script.script",
  "arti_outfits_mcm.script.script",
  "arti_slot_control.script.script",
  "arti_slot_control_mcm.script.script",
  "arti_slot_loot.script.script",
  "arti_workshop_tool.script.script",
  "autodoc_binder.script.script",
  "a_wpo_parts.script.script",
  "ayykyu_screen_effects.script.script",
  "ayykyu_voiced_actor.script.script",
  "bas_adder.script.script",
  "bas_trade_inject.script.script",
  "binoc_pistol_knife.script.script",
  "bountysquads_mcm.script.script",
  "box_aggregation.script.script",
  "camelbak_binder.script.script",
  "camera_reanim_project.script.script",
  "camera_reanim_project_mcm.script.script",
  "camp_lum.script.script",
  "ciga_effects.script.script",
  "clear_jam_mcm.script.script",
  "combine_all_items.script.script",
  "companion_anti_awol.script.script",
  "companion_anti_awol_mcm.script.script",
  "companion_ui_mcm.script.script",
  "cozy_campfire.script.script",
  "custom_functor_autoinject.script.script",
  "custom_loot.script.script",
  "deal_manager.script.script",
  "demonized_time_events.script.script",
  "disassemble_all_items.script.script",
  "dph_mcm_save_storage.script.script",
  "dynamic_companion_carryweight.script.script",
  "dynamic_npc_armor_visuals.script.script",
  "efp_med_workshop.script.script",
  "eft_item_boxes.script.script",
  "eft_jump_sounds.script.script",
  "eft_jump_sounds_mcm.script.script",
  "eft_rattle.script.script",
  "eft_rattle_mcm.script.script",
  "enhanced_animations.script.script",
  "exo_loot.script.script",
  "exo_mcm.script.script",
  "exo_power_activator_mcm.script.script",
  "exo_powers.script.script",
  "exo_servo_sounds.script.script",
  "exo_servo_sounds_mcm.script.script",
  "faction_economy_mcm.script.script",
  "faction_stocks.script.script",
  "faction_trade_ui.script.script",
  "fluid_aim.script.script",
  "food_poisoning.script.script",
  "food_poison_mcm.script.script",
  "fov_anim_manager.script.script",
  "g36pack_traderinject.script.script",
  "game_diff_override.script.script",
  "gameplay_peace_zone.script.script",
  "grok_bo.script.script",
  "grok_bo_eft_hit_effects.script.script",
  "grok_bo_enhanced_recoil.script.script",
  "grok_masks_reflections.script.script",
  "grok_navs_masks_enabler.script.script",
  "grok_stashes_on_corpses.script.script",
  "haru_ammo_spawns.script.script",
  "haruka_fill.script.script",
  "haru_skills.script.script",
  "haru_skills_mcm.script.script",
  "haru_zoom.script.script",
  "he_is_with_me.script.script",
  "hides_workshop.script.script",
  "hxf_tough_important_npcs.script.script",
  "igi_actions_basic.script.script",
  "igi_activities.script.script",
  "igi_ara.script.script",
  "igi_callbacks.script.script",
  "igi_conditions.script.script",
  "igi_conditions_basic.script.script",
  "igi_db.script.script",
  "igi_description.script.script",
  "igi_finder.script.script",
  "igi_generic_task.script.script",
  "igi_helper.script.script",
  "igi_json.script.script",
  "igi_linker.script.script",
  "igi_macros.script.script",
  "igi_mcm.script.script",
  "igi_models.script.script",
  "igi_precondition.script.script",
  "igi_random.script.script",
  "igi_rewards.script.script",
  "igi_setup.script.script",
  "igi_subtask.script.script",
  "igi_target.script.script",
  "igi_target_assault.script.script",
  "igi_target_basic.script.script",
  "igi_target_fetch.script.script",
  "igi_target_get.script.script",
  "igi_target_kill.script.script",
  "igi_target_return.script.script",
  "igi_target_scout_arszi.script.script",
  "igi_taskdata.script.script",
  "igi_text_processor.script.script",
  "igi_utils.script.script",
  "instant_tooltip.script.script",
  "inventory_upgrades_mp.script.script",
  "ish_campfire_saving.script.script",
  "ish_campfire_saving_mcm.script.script",
  "ish_char_name_saves.script.script",
  "ish_eine_kleine_nah_music.script.script",
  "ish_firemode.script.script",
  "ish_firemode_mcm.script.script",
  "ish_fixed_bolt_manager.script.script",
  "ish_geiger_hush.script.script",
  "ish_item_stats.script.script",
  "ish_keep_bolts.script.script",
  "ish_kill_tracker.script.script",
  "ish_level_input.script.script",
  "ish_pistol_equip_override.script.script",
  "ish_read_watch.script.script",
  "ish_toggle_scope_mcm.script.script",
  "ish_total_weights.script.script",
  "ish_ui_mutant_loot.script.script",
  "ish_xr_effects_wishes.script.script",
  "item_exo_device.script.script",
  "kit_binder.script.script",
  "lc_custom.script.script",
  "lc_extra_transitions.script.script",
  "lc_extra_transitions_mcm.script.script",
  "light_gem_mcm.script.script",
  "mag_support.script.script",
  "maid_helmis_inject.script.script",
  "maid_item_inject.script.script",
  "matchbox_binder.script.script",
  "mcm_log.script.script",
  "mini_map_toggle_mcm.script.script",
  "monke_patch_ui.script.script",
  "mora_schemes.script.script",
  "mutant_decoctions.script.script",
  "nomorefreindlyfire_mcm.script.script",
  "npc_loot_claim.script.script",
  "outfit_drop_mcm.script.script",
  "outfit_speed.script.script",
  "outfit_speed_mcm.script.script",
  "pba_patch.script.script",
  "pepega_script_soup.script.script",
  "perk_based_artefacts.script.script",
  "perk_based_artefacts_bone_mapper.script.script",
  "perk_based_artefacts_item_properties.script.script",
  "perk_based_artefacts_mcm.script.script",
  "pickset_binder.script.script",
  "quickdraw_mcm.script.script",
  "quick_tp_companions_mcm.script.script",
  "rax_dynamic_custom_functor.script.script",
  "rax_full_icon_artifact_belt.script.script",
  "rax_icon_layers.script.script",
  "rax_inventory_highlights_mcm.script.script",
  "rax_persistent_highlight.script.script",
  "recipe_mines.script.script",
  "reload_hint.script.script",
  "remote_mines.script.script",
  "remove_corpse_outfit.script.script",
  "scoping_hud_fov_mcm.script.script",
  "screamback_mcm.script.script",
  "show_camfires.script.script",
  "smooth_prog_mcm.script.script",
  "speed.script.script",
  "stands_hobomatches.script.script",
  "stealth_mcm.script.script",
  "surge_protector.script.script",
  "take_item_anim.script.script",
  "TB_Coordinate_Based_Safe_Zones.script.script",
  "TB_Fairer_Thermal_Anomalies.script.script",
  "tb_new_stashes.script.script",
  "TB_Remove_Bugged_Stashes.script.script",
  "tb_remove_the_tiny_cubes.script.script",
  "TB_RF_Receiver_Packages.script.script",
  "tinpc_mcm.script.script",
  "trader_autoinject.script.script",
  "ui_addon_companion_quick_menu.script.script",
  "ui_haru_skills.script.script",
  "ui_mcm.script.script",
  "ui_minimap_counter.script.script",
  "ui_pda_autoinject.script.script",
  "upgrade_rank_pricing.script.script",
  "upgrades_mcm.script.script",
  "utils_ui_custom.script.script",
  "void_fmode_sound.script.script",
  "void_fmode_sound_mcm.script.script",
  "warfare_monkeypatches.script.script",
  "weight.script.script",
  "wepl_hit_effect.script.script",
  "workshop_autoinject.script.script",
  "workshop_outfits.script.script",
  "wpo_loot.script.script",
  "yohji_persistent_weather.script.script",
  "z_beefs_nvgs.script.script",
  "z_beefs_nvgs_mcm.script.script",
  "z_npc_footsteps.script.script",
  "zz_companion_inentory_remote_mcm.script.script",
  "zz_companion_inventory_fix_mcm.script.script",
  "zz_Cost_in_tool_tip.script.script",
  "zz_glowstick_mcm.script.script",
  "zz_item_artefact.script.script",
  "zz_item_cooking_keep_crafting_window_open.script.script",
  "zz_item_repair_keep_crafting_window_open.script.script",
  "zz_time_events_keep_crafting_window_open.script.script",
  "zz_treasure_manager_pba_less_artys.script.script",
  "zz_ui_itm_details_repair_bonuses.script.script",
  "zz_ui_workshop_keep_crafting_window_open.script.script",
  "zz_warfare_mech_fix.script.script",
  "zzz_bas_laser_control.script.script",
  "zzz_igi_gt_monkeypatches.script.script",
  "zzz_igi_monkeypatches.script.script",
  "zzz_player_injuries.script.script",
  "zzz_player_injuries_mcm.script.script",
  "zzz_rax_sortingplus_mcm.script.script",
  "zzz_stands_patch.script.script",
  "zzzz_arti_jamming_repairs.script.script",
  "zzzzz_arti_outfit_repair.script.script",
]
// Efp scripts are concatonated inside vanillascripts line 416
module.exports = { vScripts }
