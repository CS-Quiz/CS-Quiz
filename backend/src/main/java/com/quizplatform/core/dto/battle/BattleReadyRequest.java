package com.quizplatform.core.dto.battle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BattleReadyRequest {
    private Long userId;
    private Long roomId;
}