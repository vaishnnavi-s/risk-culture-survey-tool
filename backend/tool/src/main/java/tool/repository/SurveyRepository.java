package tool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tool.entity.Survey;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}