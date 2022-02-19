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
]
module.exports = vScripts
