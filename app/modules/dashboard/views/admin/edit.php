<form class="uk-form uk-form-horizontal" action="<?= $view->url('@system/dashboard/save', ['id' => $widget->getId()]) ?>" method="post">

    <?php $view->section()->start('toolbar', 'show') ?>
        <button class="uk-button uk-button-primary" type="submit"><?= __('Save') ?></button>
        <a class="uk-button" href="<?= $view->url('@system/dashboard/settings') ?>"><?= $widget->getId() ? __('Close') : __('Cancel') ?></a>
    <?php $view->section()->end() ?>

    <?= $type->renderForm($widget) ?>

    <input type="hidden" name="widget[type]" value="<?= $type->getId() ?>">
    <?php $view->token()->get() ?>

</form>