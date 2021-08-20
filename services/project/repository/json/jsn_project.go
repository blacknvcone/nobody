package json

import (
	"context"

	"github.com/blacknvcone/nobody/domain"
)

type jsnProjectRepository struct {
	path string
}

func NewJsnProjectRepository(p string) domain.ProjectRepository {
	jpr := new(jsnProjectRepository)
	jpr.path = p

	return &jsnProjectRepository{p}
}

func (pr *jsnProjectRepository) Fetch(ctx context.Context) ([]domain.Project, error) {

	return nil, nil
}

func (pr *jsnProjectRepository) Store(ctx context.Context, p *domain.Project) (*domain.Project, error) {

	return nil, nil
}
