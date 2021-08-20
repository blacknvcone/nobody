package domain

import (
	"context"
	"time"
)

type Project struct {
	ID           string    `json:"_id"`
	Title        string    `json:"title"`
	ProjectOwner string    `json:"project_owner"`
	Description  string    `json:"description"`
	GitURL       string    `json:"git_url"`
	Role         string    `json:"role"`
	CreatedAt    time.Time `jsin:"created_at"`
}

type ProjectUseCase interface {
	Get(ctx context.Context) ([]*Project, error)
	AddProject(ctx context.Context, title, project_owner, description, git_url, role string)
}

type ProjectRepository interface {
	Fetch(ctx context.Context) ([]Project, error)
	Store(ctx context.Context, pr *Project) (*Project, error)
}
