package com.quizplatform.core.repository.quiz;

import com.quizplatform.core.domain.quiz.Quiz;
import com.quizplatform.core.domain.quiz.QuizAttempt;
import com.quizplatform.core.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByQuiz(Quiz quiz);
    Page<QuizAttempt> findByUser(User user, Pageable pageable);

    @Query("SELECT qa FROM QuizAttempt qa " +
            "WHERE qa.user = :user " +
            "AND qa.createdAt BETWEEN :startDate AND :endDate")
    List<QuizAttempt> findByUserAndDateRange(
            @Param("user") User user,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT qa FROM QuizAttempt qa " +
            "WHERE qa.user = :user AND qa.createdAt >= :since")
    List<QuizAttempt> findRecentAttempts(
            @Param("user") User user,
            @Param("since") LocalDateTime since
    );

    @Query("SELECT qa FROM QuizAttempt qa " +
            "WHERE qa.quiz = :quiz " +
            "ORDER BY qa.score DESC")
    List<QuizAttempt> findTopAttemptsByQuiz(
            @Param("quiz") Quiz quiz,
            Pageable pageable
    );

    @Query("SELECT COUNT(qa) > 0 FROM QuizAttempt qa " +
            "WHERE qa.user = :user AND qa.quiz = :quiz AND qa.isCompleted = true")
    boolean hasCompletedQuiz(
            @Param("user") User user,
            @Param("quiz") Quiz quiz
    );

    long countByUserId(Long userId);

    long countByUserIdAndIsCompletedTrue(Long userId);

    @Query("SELECT AVG(qa.score) FROM QuizAttempt qa WHERE qa.user.id = :userId")
    Double getAverageScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(qa.timeTaken) FROM QuizAttempt qa WHERE qa.user.id = :userId")
    Integer getTotalTimeTakenByUserId(@Param("userId") Long userId);

    @Query("SELECT MAX(qa.score) FROM QuizAttempt qa WHERE qa.user.id = :userId")
    Integer getMaxScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT MIN(qa.score) FROM QuizAttempt qa WHERE qa.user.id = :userId AND qa.score > 0")
    Integer getMinScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.user.id = :userId ORDER BY qa.createdAt DESC")
    List<QuizAttempt> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId, Pageable pageable);

}
